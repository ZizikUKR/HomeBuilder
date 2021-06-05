using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Homebuilder.Domain.Views.Guids.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum UtilityBillNameEnumView
    {
        Electricity = 1,
        HotWater = 2,
        ColdWater = 3,
        Heating = 4,
        RentBill = 5,
        Sanitation = 6,
        Gas = 7,
        GasDelivery = 8,
        GarbageUtilization = 9,
        DoorPhone = 10
    }
}
