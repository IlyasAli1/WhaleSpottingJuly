using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WhaleSpotting.Models.RequestModels
{
    public class WhaleMuseumSightingModel
    {
        int id { get; set; }
        string species { get; set; }
        int quantity { get; set; }
        string descrption { get; set; }
        string url { get; set; }
        long latitude { get; set; }
        long longitude { get; set; }
        string location { get; set; }
        DateTime sighted_at { get; set; }
        DateTime created_at { get; set; }
        DateTime updated_at { get; set; }
        string orca_type { get; set; }
    }
}
