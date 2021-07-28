using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.RequestModels;
using System.Net.Http;
using System.Net.Http.Headers;
using WhaleSpotting.Services.Helpers;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SightingController : ControllerBase
    {
        [HttpGet]
        public IActionResult Sighting()
        {
            //async Task<IEnumerable<SightingResponseModel>> GetSightingsAsync ()
            //{
            //    IEnumerable<SightingResponseModel> result = null;
                
            //    HttpClient client = new HttpClient();
            //    HttpResponseMessage response = await client.GetAsync("http://hotline.whalemuseum.org/api.json");
            //    if (response.IsSuccessStatusCode)
            //    {
            //        var jsonText = await response.Content.ReadAsStringAsync();
            //        result = JsonConvert.DeserializeObject<List<SightingResponseModel>>(jsonText);
            //    }
            //    return result;
            //}

            return Created(Url.Action("Get", new { id = 2 }), new SightingResponseModel());
        }
    }
}