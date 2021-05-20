using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;

namespace Homebuilder.Domain.Views.Longs.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum StateEnumView
    {
        None = 0,
        [EnumMember(Value = "High Price")]
        HighPrice = 1,
        Medium = 2,
        Final = 3
    }
}
