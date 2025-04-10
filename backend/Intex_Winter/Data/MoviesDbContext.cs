using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Intex_Winter.Models;

public partial class MoviesDbContext : DbContext
{
    public MoviesDbContext()
    {
    }

    public MoviesDbContext(DbContextOptions<MoviesDbContext> options)
        : base(options)
    {
    }

    public DbSet<MoviesRating> MoviesRatings { get; set; }

    public DbSet<MoviesTitle> MoviesTitles { get; set; }

    public DbSet<MoviesUser> MoviesUsers { get; set; }
    
    public DbSet<RatingRecommender> RatingRecommenders { get; set; }
    public DbSet<UserRatingRecommender> UserRatingRecommenders { get; set; }
    
    public DbSet<ContentFilterRecommender> ContentRecommendations { get; set; }
}