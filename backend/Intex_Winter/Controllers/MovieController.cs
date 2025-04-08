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
                query = query.Where(m => m.Genre.Contains(genre));
            }

            var results = await query.ToListAsync();

            return Ok(results);
        }

        


    }
}