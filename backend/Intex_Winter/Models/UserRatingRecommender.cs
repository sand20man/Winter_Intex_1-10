using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Intex_Winter.Models;

[Keyless]
[Table("user_rating_recommendations")]
public class UserRatingRecommender
{
    [Column("index")] // user_id
    public long index { get; set; }

    [Column("Because you rated")]
    public string? Title { get; set; }
    
    [Column("Rec 1 id")]
    public string? Rec1 { get; set; }
    [Column("Rec 2 id")]
    public string? Rec2 { get; set; }
    [Column("Rec 3 id")]
    public string? Rec3 { get; set; }
    [Column("Rec 4 id")]
    public string? Rec4 { get; set; }
    [Column("Rec 5 id")]
    public string? Rec5 { get; set; }
    [Column("Rec 6 id")]
    public string? Rec6 { get; set; }
    [Column("Rec 7 id")]
    public string? Rec7 { get; set; }
    [Column("Rec 8 id")]
    public string? Rec8 { get; set; }
    [Column("Rec 9 id")]
    public string? Rec9 { get; set; }
    [Column("Rec 10 id")]
    public string? Rec10 { get; set; }
    [Column("Rec 11 id")]
    public string? Rec11 { get; set; }
    [Column("Rec 12 id")]
    public string? Rec12 { get; set; }
    [Column("Rec 13 id")]
    public string? Rec13 { get; set; }
    [Column("Rec 14 id")]
    public string? Rec14 { get; set; }
    [Column("Rec 15 id")]
    public string? Rec15 { get; set; }
    [Column("Rec 16 id")]
    public string? Rec16 { get; set; }
    [Column("Rec 17 id")]
    public string? Rec17 { get; set; }
    [Column("Rec 18 id")]
    public string? Rec18 { get; set; }
    [Column("Rec 19 id")]
    public string? Rec19 { get; set; }
    [Column("Rec 20 id")]
    public string? Rec20 { get; set; }
    
}