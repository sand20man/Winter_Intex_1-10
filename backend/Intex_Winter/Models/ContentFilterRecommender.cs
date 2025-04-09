using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Intex_Winter.Models;


[Keyless]
[Table("content_filtering_recommendations")]
public class ContentFilterRecommender
{
    [Column("show_id")]
    public required string ShowId { get; set; }
    
    [Column("0")]
    public string? Rec0 { get; set; }
    
    [Column("1")]
    public string? Rec1 { get; set; }
    
    [Column("2")]
    public string? Rec2 { get; set; }
    
    [Column("3")]
    public string? Rec3 { get; set; }
    
    [Column("4")]
    public string? Rec4 { get; set; }
    
    [Column("5")]
    public string? Rec5 { get; set; }
    
    [Column("6")]
    public string? Rec6 { get; set; }
    
    [Column("7")]
    public string? Rec7 { get; set; }
    
    [Column("8")]
    public string? Rec8 { get; set; }
    
    [Column("9")]
    public string? Rec9 { get; set; }
    
    [Column("10")]
    public string? Rec10 { get; set; }
    
    [Column("11")]
    public string? Rec11 { get; set; }
    
    [Column("12")]
    public string? Rec12 { get; set; }
    
    [Column("13")]
    public string? Rec13 { get; set; }
    
    [Column("14")]
    public string? Rec14 { get; set; }
    
    [Column("15")]
    public string? Rec15 { get; set; }
    
    [Column("16")]
    public string? Rec16 { get; set; }
    
    [Column("17")]
    public string? Rec17 { get; set; }
    
    [Column("18")]
    public string? Rec18 { get; set; }

    [Column("19")] 
    public string? Rec19 { get; set; }
}