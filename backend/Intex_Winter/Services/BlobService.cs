namespace Intex_Winter.Services;

using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

public class BlobService
{
    private readonly BlobContainerClient _containerClient;

    public BlobService(IConfiguration config)
    {
        var connectionString = config["AzureBlobStorage:ConnectionString"];
        var containerName = config["AzureBlobStorage:ContainerName"];
        _containerClient = new BlobContainerClient(connectionString, containerName);
    }

    public async Task<List<string>> GetPosterUrlsAsync()
    {
        var posterUrls = new List<string>();

        await foreach (BlobItem blobItem in _containerClient.GetBlobsAsync())
        {
            var uri = _containerClient.GetBlobClient(blobItem.Name).Uri.ToString();
            posterUrls.Add(uri);
        }

        return posterUrls;
    }
}
