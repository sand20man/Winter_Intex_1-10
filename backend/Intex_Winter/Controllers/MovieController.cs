using System;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet]
        public IActionResult GetAllMovies(int skip = 0, int take = 20)
        {
            var movies = _context.MoviesTitles
                .AsNoTracking()
                .OrderBy(m => m.Title)
                .Skip(skip)
                .Take(take)
                .ToList();
            
            return Ok(movies);
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
                query = query.Where(m => m.Genre.Contains(genre)).Take(20);
            }

            var results = await query.ToListAsync();

            return Ok(results);
        }
        
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

            Console.WriteLine("results: ");
            foreach (var result in individualResults)
            {
                Console.WriteLine(result);
            }

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
        

    }
}