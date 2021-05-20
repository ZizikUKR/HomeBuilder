using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;

namespace Homebuilder.Domain.Views.Guids.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum UtilityBillNameEnumView
    {
        Electricity = 1,
        HotWater = 2,
        [EnumMember(Value = "Cold Water")]
        ColdWater = 3,
        Heating = 4,
        [EnumMember(Value = "Rent Bill")]
        RentBill = 5,
        Sanitation = 6,
        Gas = 7,
        [EnumMember(Value = "Gas Delivery")]
        GasDelivery = 8,
        [EnumMember(Value = "Garbage Utilization")]
        GarbageUtilization = 9,
        [EnumMember(Value = "Door Phone")]
        DoorPhone = 10
    }
}
