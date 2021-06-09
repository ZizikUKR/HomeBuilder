using Homebuilder.Domain.Entities.Guids.Enums;

namespace Homebuilder.Domain.Entities.Guids
{
    public class GetCurrentUtilityBillMonthSpendDto
    {
        public UtilityBillName Name { get; set; }
        public int Price { get; set; }
    }
}
