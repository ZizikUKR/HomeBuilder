using Homebuilder.Domain.Entities.Guids.Enums;

namespace Homebuilder.Domain.Entities.Guids.Foods
{

    public class GetMonthPrice
    {
        public MonthEnum Month { get; set; }
        public int MonthPrice { get; set; }
    }
}
