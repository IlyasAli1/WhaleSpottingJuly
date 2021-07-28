using Newtonsoft.Json;
using System;
using WhaleSpotting.Models.DbModels;
using WhaleSpotting.Models.Enums;

namespace WhaleSpotting.Models.ApiModels
{
    public class SightingResponseModel
    {
        [JsonProperty("sighted_at")]
        public DateTime SightedAt { get; set; }
        [JsonProperty("species")]
        public Species Species { get; set; }
        [JsonProperty("quantity")]
        public int Quantity { get; set; }
        [JsonProperty("location")]
        public string Location { get; set; }
        [JsonProperty("longitude")]
        public double Longitude { get; set; }
        [JsonProperty("latitude")]
        public double Latitude { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("orca_type")]
        public OrcaType? OrcaType { get; set; }
        public string OrcaPod { get; set; }
        public int? UserId { get; set; } = 4;
        public string Username { get; set; } = "Whale Museum";
        public bool Confirmed { get; set; } = true;
        public SightingResponseModel ()
        {
        }

        public SightingResponseModel(SightingDbModel sighting)
        {
            SightedAt = sighting.SightedAt;
            Species = sighting.Species;
            Quantity = sighting.Quantity;
            Location = sighting.Location;
            Longitude = sighting.Longitude;
            Latitude = sighting.Latitude;
            Description = sighting.Description;
            OrcaType = sighting.OrcaType;
            OrcaPod = sighting.OrcaPod;
            Confirmed = sighting.Confirmed;

            //TODO - Use real UserId and Username
            UserId = 4;
            Username = "FakeUser";
        }

    }
}