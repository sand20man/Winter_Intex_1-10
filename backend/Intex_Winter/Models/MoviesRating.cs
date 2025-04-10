using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Intex_Winter.Models;

[PrimaryKey(nameof(UserId), nameof(ShowId))]
[Table("movies_ratings")]
public partial class MoviesRating
{
    
    [Column("user_id")]
    public int? UserId { get; set; }
    
    [Column("show_id")]
    public string? ShowId { get; set; }

    [Column("rating")]
    public int? Rating { get; set; }
}
