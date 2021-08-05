using System.Collections.Generic;

namespace WhaleSpotting.Models.Enums
{
    public static class Permissions
    {
        public static List<string> GeneratePermissionsForModule(string module)
        {
            return new List<string>()
        {
            $"Permissions.{module}.Create",
            //$"Permissions.{module}.View",
            $"Permissions.{module}.Edit",
            $"Permissions.{module}.Delete",
        };
        }

        public static class SightingDbModel
        {
            //public const string View = "Permissions.Sightings.View";
            public const string Create = "Permissions.Sightings.Create";
            public const string Edit = "Permissions.Sightings.Edit";
            public const string Delete = "Permissions.Sightings.Delete";
        }
    }
}
