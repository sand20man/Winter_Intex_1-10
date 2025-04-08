using Intex_Winter.Services;
using Microsoft.AspNetCore.Mvc;

namespace Intex_Winter.Data;

public class PostersController : Controller
{
    private readonly BlobService _blobService;

    public PostersController(BlobService blobService)
    {
        _blobService = blobService;
    }

    public async Task<IActionResult> Index()
    {
        var posterUrls = await _blobService.GetPosterUrlsAsync();
        return View(posterUrls);
    }
}