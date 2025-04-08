using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Intex_Winter.Models;

[Keyless]
[Table("movie_rating_recommendations")]
public class RatingRecommender
{
    // public int index { get; set; }
    
    [Column("show_id")]
    public string ShowId { get; set; }

    [Column("If you watched")]
    public string? Title { get; set; }

    [Column("Rec. 1 show_id")]
    public string? Rec1 { get; set; }

    [Column("Rec. 2 show_id")]
    public string? Rec2 { get; set; }

    [Column("Rec. 3 show_id")]
    public string? Rec3 { get; set; }

    [Column("Rec. 4 show_id")]
    public string? Rec4 { get; set; }

    [Column("Rec. 5 show_id")]
    public string? Rec5 { get; set; }

}