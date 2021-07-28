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
            // packages used:
            // Microsoft.AspNet.WebApi.Client
            // Newtonsoft.Json

            IEnumerable<SightingResponseModel> result = null;
            var URL = "http://hotline.whalemuseum.org/";

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL);

            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            var response = client.GetAsync("api.json").Result;  
            if (response.IsSuccessStatusCode)
            {
                var json = response.Content.ReadAsStringAsync().Result; 
                result = JsonConvert.DeserializeObject<List<SightingResponseModel>>(json);
            }
            else
            {
                return BadRequest("Error");
            }

            return Created(Url.Action("Get", new { id = 2 }), result);
        }
    }
}