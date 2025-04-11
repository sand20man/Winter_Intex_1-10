using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Intex_Winter.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Intex_Winter.Controllers
{
    // [Authorize]
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

        [Authorize(Roles = "admin")]
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            _context.MoviesTitles.Add(newMovie);
            _context.SaveChanges();
            return Ok(newMovie);
        }

        [Authorize(Roles = "admin")]
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
            existingMovie.BritishTvShowsDocuseriesInternationalTvShows =
                updatedMovie.BritishTvShowsDocuseriesInternationalTvShows;
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

        [Authorize(Roles = "admin")]
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
                .Select(m => m.ShowId) // Only fetch ShowIds
                .AsEnumerable() // Switch to LINQ-to-Objects
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
        public async Task<IActionResult> SearchMoviesByGenres(
            [FromQuery] string genres,
            [FromQuery] int skip = 0,
            [FromQuery] int take = 20)
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

            var totalCount = await query.CountAsync();

            var pagedResults = await query
                .OrderBy(m => m.Title)
                .Skip(skip)
                .Take(take)
                .ToListAsync();

            var result = new
            {
                Movies = pagedResults,
                TotalCount = totalCount
            };

            return Ok(result);
        }

        
        [AllowAnonymous]
        [HttpGet("get_genres")]
        public async Task<IActionResult> GetGenres()
        {
            var query = _context.MoviesTitles.Select(m => m.Genre);
            var results = await query.ToListAsync();

            var individualResults = results
                .Where(g => !string.IsNullOrWhiteSpace(g))
                .SelectMany(g => g.Split(",", StringSplitOptions.RemoveEmptyEntries))
                .Select(g => g.Trim())
                .Distinct()
                .ToList();

            return Ok(individualResults);
        }

        [HttpGet("recommender1")]
        public async Task<IActionResult> GetRecommendedMovies([FromQuery] string showId)
        {
            if (string.IsNullOrEmpty(showId))
            {
                return BadRequest("Please provide a movie to be recommended on.");
            }

            try
            {
                var recommendationRecord = await _context.RatingRecommenders
                    .FirstOrDefaultAsync(r => r.ShowId == showId);

                if (recommendationRecord == null)
                {
                    return NotFound($"No recommendations found for showId: {showId}");
                }

                return Ok(recommendationRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("recommender2")]
        public async Task<IActionResult> GetUserRecommendedMovies([FromQuery] long? userId)
        {
            if (userId == null)
            {
                return BadRequest("Please provide a user to be recommended on.");
            }

            try
            {
                Console.WriteLine($"userID: {userId}");

                var recommendationRecord = await _context.UserRatingRecommenders
                    .FirstOrDefaultAsync(r => r.index == userId.Value);

                if (recommendationRecord == null)
                {
                    return NotFound($"No recommendations found for userId: {userId}");
                }

                return Ok(recommendationRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        
        [AllowAnonymous]
        [HttpGet("ContentRecommender")]
        public async Task<IActionResult> ContentRecommendedMovies([FromQuery] string showId)
        {
            if (string.IsNullOrEmpty(showId))
            {
                return BadRequest("Please provide a movie to be recommended on.");
            }

            try
            {
                var ContentRecommendedMovies = await _context.ContentRecommendations
                    .FirstOrDefaultAsync(r => r.ShowId == showId);

                if (ContentRecommendedMovies == null)
                {
                    return NotFound($"No recommendations found for showId: {showId}");
                }

                return Ok(ContentRecommendedMovies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [AllowAnonymous]
        [HttpPost("PutRating")]
        public async Task<IActionResult> SubmitRating([FromBody] MoviesRating ratingData)
        {
            Console.WriteLine($"Rating POST hit! UserId: {ratingData?.UserId}, ShowId: {ratingData?.ShowId}, Rating: {ratingData?.Rating}");
            if (ratingData == null || string.IsNullOrWhiteSpace(ratingData.ShowId))
            {
                return BadRequest("Invalid rating data.");
            }

            // Check if it exists — update if so, insert otherwise
            var existing = await _context.MoviesRatings
                .FirstOrDefaultAsync(r => r.UserId == ratingData.UserId && r.ShowId == ratingData.ShowId);

            if (existing != null)
            {
                existing.Rating = ratingData.Rating;
            }
            else
            {
                _context.MoviesRatings.Add(ratingData);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Rating saved successfully" });
        }
        
        [AllowAnonymous]
        [HttpGet("get_rating")]
        public async Task<IActionResult> GetRating(int userId, string showId)
        {
            var rating = await _context.MoviesRatings
                .Where(r => r.UserId == userId && r.ShowId == showId)
                .Select(r => r.Rating)
                .FirstOrDefaultAsync();

            return Ok(rating);
        }
    }
}