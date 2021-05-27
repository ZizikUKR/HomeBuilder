using Homebuilder.Domain.Views.Guids.Enums;
using System;

namespace Homebuilder.Domain.Views.Guids.UtilityBills
{
    public class UpdateUtilityBillView
    {
        public string Id { get; set; }
        public DateTime CreationDate { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public DateTime PaidPeriodFrom { get; set; }
        public DateTime PaidPeriodTo { get; set; }
        public UtilityBillNameEnumView Name { get; set; }
    }
}
