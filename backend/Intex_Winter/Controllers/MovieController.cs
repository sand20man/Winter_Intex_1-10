using Microsoft.AspNetCore.Mvc;
using Intex_Winter.Models;
using Microsoft.EntityFrameworkCore;

namespace Intex_Winter.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly MoviesDbContext _context;

        public MovieController(MoviesDbContext context)
        {
            _context = context;
        }
        
        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int pageSize = 20, int pageNum = 1)
        {
            var query = _context.MoviesTitles.AsQueryable();

            var totalNumMovies = query.Count();

            var movies = query
                .AsNoTracking()
                .OrderBy(m => m.Title)
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                Movies = movies,
                TotalNumMovies = totalNumMovies
            };

            return Ok(result);
        }
        
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            _context.MoviesTitles.Add(newMovie);
            _context.SaveChanges();
            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{showId}")]
        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _context.MoviesTitles.Find(showId);

            existingMovie.Type = updatedMovie.Type;
            existingMovie.Title = updatedMovie.Title;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.Cast = updatedMovie.Cast;
            existingMovie.Country = updatedMovie.Country;
            existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
            existingMovie.Rating = updatedMovie.Rating;
            existingMovie.Duration = updatedMovie.Duration;
            existingMovie.Description = updatedMovie.Description;
            existingMovie.Genre = updatedMovie.Genre;
            existingMovie.Action = updatedMovie.Action;
            existingMovie.Adventure = updatedMovie.Adventure;
            existingMovie.AnimeSeriesInternationalTvShows = updatedMovie.AnimeSeriesInternationalTvShows;
            existingMovie.BritishTvShowsDocuseriesInternationalTvShows = updatedMovie.BritishTvShowsDocuseriesInternationalTvShows;
            existingMovie.Children = updatedMovie.Children;
            existingMovie.Comedies = updatedMovie.Comedies;
            existingMovie.ComediesDramasInternationalMovies = updatedMovie.ComediesDramasInternationalMovies;
            existingMovie.ComediesInternationalMovies = updatedMovie.ComediesInternationalMovies;
            existingMovie.ComediesRomanticMovies = updatedMovie.ComediesRomanticMovies;
            existingMovie.CrimeTvShowsDocuseries = updatedMovie.CrimeTvShowsDocuseries;
            existingMovie.Documentaries = updatedMovie.Documentaries;
            existingMovie.DocumentariesInternationalMovies = updatedMovie.DocumentariesInternationalMovies;
            existingMovie.Docuseries = updatedMovie.Docuseries;
            existingMovie.Dramas = updatedMovie.Dramas;
            existingMovie.DramasInternationalMovies = updatedMovie.DramasInternationalMovies;
            existingMovie.DramasRomanticMovies = updatedMovie.DramasRomanticMovies;
            existingMovie.FamilyMovies = updatedMovie.FamilyMovies;
            existingMovie.Fantasy = updatedMovie.Fantasy;
            existingMovie.HorrorMovies = updatedMovie.HorrorMovies;
            existingMovie.InternationalMoviesThrillers = updatedMovie.InternationalMoviesThrillers;
            existingMovie.InternationalTVShowsRomanticTVDramas = updatedMovie.InternationalTVShowsRomanticTVDramas;
            existingMovie.KidsTv = updatedMovie.KidsTv;
            existingMovie.LanguageTvShows = updatedMovie.LanguageTvShows;
            existingMovie.Musicals = updatedMovie.Musicals;
            existingMovie.NatureTv = updatedMovie.NatureTv;
            existingMovie.RealityTv = updatedMovie.RealityTv;
            existingMovie.Spirituality = updatedMovie.Spirituality;
            existingMovie.TvAction = updatedMovie.TvAction;
            existingMovie.TvComedies = updatedMovie.TvComedies;
            existingMovie.TvDramas = updatedMovie.TvDramas;
            existingMovie.TalkShowsTvComedies = updatedMovie.TalkShowsTvComedies;
            existingMovie.Thrillers = updatedMovie.Thrillers;

            _context.MoviesTitles.Update(existingMovie);
            _context.SaveChanges();

            return Ok(existingMovie);
        }

        [HttpDelete("DeleteMovie/{showId}")]
        public IActionResult DeleteMovie(string showId)
        {
            var movie = _context.MoviesTitles.Find(showId);

            if (movie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }

            _context.MoviesTitles.Remove(movie);
            _context.SaveChanges();

            return NoContent();
        }
        
        [HttpGet("latestShowid")]
        public IActionResult GetLatestShowId()
        {
            var latestId = _context.MoviesTitles
                .AsNoTracking()
                .Select(m => m.ShowId)  // Only fetch ShowIds
                .AsEnumerable()         // Switch to LINQ-to-Objects
                .Where(id => id.StartsWith("s") && int.TryParse(id.Substring(1), out _)) // Only valid numeric ids
                .Select(id => new
                {
                    Original = id,
                    Numeric = int.Parse(id.Substring(1))
                })
                .OrderByDescending(x => x.Numeric)
                .FirstOrDefault();

            return Ok(latestId?.Original ?? "s0000");
        }
        
        [HttpGet("{id}")]
        public IActionResult GetMovieById(string id)
        {
            var movie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == id);
            if (movie == null)
                return NotFound();
            return Ok(movie);
        }

        [HttpGet("search")]
        public IActionResult SearchMovies([FromQuery] string title)
        {
            var results = _context.MoviesTitles
                .Where(m => m.Title != null && m.Title.Contains(title))
                .ToList();
            return Ok(results);
        }
        
        [HttpGet("genre_search")]
        public async Task<IActionResult> SearchMoviesByGenres([FromQuery] string genres)
        {
            if (string.IsNullOrEmpty(genres))
            {
                return BadRequest("Please provide one or more genres.");
            }

            var genreList = genres.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            var query = _context.MoviesTitles.AsQueryable();

            foreach (var genre in genreList)
            {
                query = query.Where(m => m.Genre.Contains(genre));
            }

            var results = await query.ToListAsync();

            return Ok(results);
        }

        


    }
}