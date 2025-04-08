using Intex_Winter.Services;
using Microsoft.AspNetCore.Mvc;

namespace Intex_Winter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostersController : ControllerBase
{
    private readonly BlobService _blobService;

    public PostersController(BlobService blobService)
    {
        _blobService = blobService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var posterUrls = await _blobService.GetPosterUrlsAsync();
        return Ok(posterUrls); // returns JSON array of image URLs
    }
}
