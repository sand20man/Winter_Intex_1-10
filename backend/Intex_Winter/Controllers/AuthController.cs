using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Intex_Winter.Models;
using Microsoft.AspNetCore.Identity.Data;

namespace Intex_Winter.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly UserManager<IdentityUser> _userManager;

    public AuthController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null) return Unauthorized("User not found");

        var result = await _signInManager.PasswordSignInAsync(user, model.Password, true, false);
        if (!result.Succeeded) return Unauthorized("Invalid credentials");

        return Ok(new { message = "Login successful" });
    }

    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        if (!User.Identity?.IsAuthenticated ?? true)
            return Unauthorized();

        var email = User.FindFirstValue(ClaimTypes.Email);
        var user = await _userManager.FindByEmailAsync(email!);

        if (user == null)
            return NotFound();

        return Ok(new { email = user.Email });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(new { message = "Logged out" });
    }
}