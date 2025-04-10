using System.Security.Claims;
using Intex_Winter.Data;
using Intex_Winter.Models;
using Intex_Winter.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SupportNonNullableReferenceTypes();
});

builder.Services.AddDbContext<MoviesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MovieConnection")));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MovieConnection")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 10;
    options.Password.RequiredUniqueChars = 4;

    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedPhoneNumber = false;

    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.HttpOnly = true;
    options.LoginPath = "/login";
    
    options.Events.OnValidatePrincipal = async context =>
    {
        var consent = context.HttpContext.Request.Cookies["cookie_consent"];
        if (consent != "true")
        {
            await context.HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
            context.ShouldRenew = false;
        }
    };
    
    options.Events.OnRedirectToLogin = context =>
    {
        var consent = context.Request.Cookies["cookie_consent"];
        if (consent != "true")
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        }
    
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
    
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    };
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
    options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
    options.DefaultSignInScheme = IdentityConstants.ApplicationScheme;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "https://jolly-plant-06ec5441e.6.azurestaticapps.net")
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();
builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();
builder.Services.AddSingleton<BlobService>();

var app = builder.Build();

// Debug helper to inspect current auth state
app.MapGet("/debug-auth", (HttpContext context) =>
{
    var identity = context.User.Identity;
    var claims = context.User.Claims.Select(c => new { c.Type, c.Value });

    return Results.Json(new
    {
        IsAuthenticated = identity?.IsAuthenticated,
        Name = identity?.Name,
        Claims = claims
    });
});

// CORS + Preflight middleware
app.Use(async (context, next) =>
{
    if (context.Request.Method == HttpMethods.Options)
    {
        context.Response.StatusCode = 204;
        return;
    }
    await next();
});

// Core Middleware
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Append("Content-Security-Policy",
            "default-src 'self'; " +
            "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com https://*.firebaseio.com 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src 'self' https://fonts.gstatic.com; " +
            "img-src 'self' data: https://www.google-analytics.com https://*.firebaseio.com; " +
            "connect-src 'self' https://*.firebaseio.com https://*.stripe.com https://api.yourdomain.com https://www.google-analytics.com; " +
            "frame-src https://js.stripe.com https://*.firebaseapp.com; " +
            "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';");

        context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
        context.Response.Headers.Append("X-Frame-Options", "DENY");
        context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
        context.Response.Headers.Append("Permissions-Policy", "geolocation=(), microphone=()");
        context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

        await next();
    });
}

// Routes
app.MapControllers();
app.MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application");
    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

app.MapGet("/pingauth", async (UserManager<IdentityUser> userManager, ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
        return Results.Unauthorized();

    var currentUser = await userManager.GetUserAsync(user);
    if (currentUser == null)
        return Results.Unauthorized();

    var roles = await userManager.GetRolesAsync(currentUser);
    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    var allClaims = user.Claims.Select(c => new { c.Type, c.Value });

    return Results.Json(new
    {
        email = email,
        roles = roles,
        claims = allClaims
    });
}).RequireAuthorization();

app.MapGet("/get-role-by-email", async (
    [FromQuery] string email,
    UserManager<IdentityUser> userManager,
    RoleManager<IdentityRole> roleManager,
    ApplicationDbContext db) =>
{
    var user = await userManager.FindByEmailAsync(email);
    if (user == null)
        return Results.NotFound("User not found");

    var roleId = await db.UserRoles
        .Where(ur => ur.UserId == user.Id)
        .Select(ur => ur.RoleId)
        .FirstOrDefaultAsync();

    var roleName = roleId == null ? null :
        await db.Roles.Where(r => r.Id == roleId).Select(r => r.Name).FirstOrDefaultAsync();

    return Results.Ok(new { role = roleName ?? "none" });
}).RequireAuthorization();

app.MapGet("/get-user-id", async (
    [FromQuery] string email,
    MoviesDbContext db) =>
{
    var user = await db.MoviesUsers.FirstOrDefaultAsync(mu => mu.Email == email);
    return user == null ? Results.NotFound("User not found") : Results.Ok(user);
});

app.MapGet("/test-alive", () => "I am alive!");

// Seed Roles
async Task SeedRoles(IServiceProvider serviceProvider)
{
    var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();

    string[] roleNames = { "admin", "user" };
    foreach (var roleName in roleNames)
    {
        if (!await roleManager.RoleExistsAsync(roleName))
        {
            await roleManager.CreateAsync(new IdentityRole(roleName));
        }
    }

    var adminEmail = "jackestes10@yahoo.com";
    var adminUser = await userManager.FindByEmailAsync(adminEmail);
    if (adminUser != null && !await userManager.IsInRoleAsync(adminUser, "admin"))
    {
        await userManager.AddToRoleAsync(adminUser, "admin");
    }
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await SeedRoles(services);
}

app.Run();
