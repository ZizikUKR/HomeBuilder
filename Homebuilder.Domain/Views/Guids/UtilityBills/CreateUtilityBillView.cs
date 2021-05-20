using Homebuilder.Domain.Views.Guids.Enums;
using System;

namespace Homebuilder.Domain.Views.Guids.UtilityBills
{
    public class CreateUtilityBillView
    {
        public int Year { get; set; }
        public decimal Price { get; set; }
        public DateTime PaidPeriodFrom { get; set; }
        public DateTime PaidPeriodTo { get; set; }
        public UtilityBillNameEnumView Name { get; set; }
    }
}
