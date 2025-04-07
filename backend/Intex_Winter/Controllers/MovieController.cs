using Microsoft.AspNetCore.Mvc;
using Intex_Winter.Models;

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
        public IActionResult GetAllMovies()
        {
            var movies = _context.MoviesTitles.ToList();
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


    }
}