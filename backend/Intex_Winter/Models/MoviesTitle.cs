using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Intex_Winter.Models;

[Keyless]
[Table("movies_titles")]
public partial class MoviesTitle
{
    [Column("show_id")]
    public string? ShowId { get; set; }

    [Column("type")]
    public string? Type { get; set; }

    [Column("title")]
    public string? Title { get; set; }

    [Column("director")]
    public string? Director { get; set; }

    [Column("cast")]
    public string? Cast { get; set; }

    [Column("country")]
    public string? Country { get; set; }

    [Column("release_year")]
    public int? ReleaseYear { get; set; }

    [Column("rating")]
    public string? Rating { get; set; }

    [Column("duration")]
    public string? Duration { get; set; }

    [Column("description")]
    public string? Description { get; set; }
    
    [Column("genre")]
    public string? Genre { get; set; }

    public int? Action { get; set; }

    public int? Adventure { get; set; }

    [Column("Anime_Series_International_TV_Shows")]
    public int? AnimeSeriesInternationalTvShows { get; set; }

    [Column("British_TV_Shows_Docuseries_International_TV_Shows")]
    public int? BritishTvShowsDocuseriesInternationalTvShows { get; set; }

    public int? Children { get; set; }

    public int? Comedies { get; set; }

    [Column("Comedies_Dramas_International_Movies")]
    public int? ComediesDramasInternationalMovies { get; set; }

    [Column("Comedies_International_Movies")]
    public int? ComediesInternationalMovies { get; set; }

    [Column("Comedies_Romantic_Movies")]
    public int? ComediesRomanticMovies { get; set; }

    [Column("Crime_TV_Shows_Docuseries")]
    public int? CrimeTvShowsDocuseries { get; set; }

    public int? Documentaries { get; set; }

    [Column("Documentaries_International_Movies")]
    public int? DocumentariesInternationalMovies { get; set; }

    public int? Docuseries { get; set; }

    public int? Dramas { get; set; }

    [Column("Dramas_International_Movies")]
    public int? DramasInternationalMovies { get; set; }

    [Column("Dramas_Romantic_Movies")]
    public int? DramasRomanticMovies { get; set; }

    [Column("Family_Movies")]
    public int? FamilyMovies { get; set; }

    public int? Fantasy { get; set; }

    [Column("Horror_Movies")]
    public int? HorrorMovies { get; set; }

    [Column("International_Movies_Thrillers")]
    public int? InternationalMoviesThrillers { get; set; }

    [Column("International_TV_Shows_Romantic_TV_Shows_TV_Dramas")]
    public int? InternationalTVShowsRomanticTVDramas { get; set; }
    
    [Column("Kids_TV")]
    public int? KidsTv { get; set; }

    [Column("Language_TV_Shows")]
    public int? LanguageTvShows { get; set; }

    public int? Musicals { get; set; }

    [Column("Nature_TV")]
    public int? NatureTv { get; set; }

    [Column("Reality_TV")]
    public int? RealityTv { get; set; }

    public int? Spirituality { get; set; }

    [Column("TV_Action")]
    public int? TvAction { get; set; }

    [Column("TV_Comedies")]
    public int? TvComedies { get; set; }

    [Column("TV_Dramas")]
    public int? TvDramas { get; set; }

    [Column("Talk_Shows_TV_Comedies")]
    public int? TalkShowsTvComedies { get; set; }

    public int? Thrillers { get; set; }
}
