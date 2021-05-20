using Dapper.Contrib.Extensions;
using Homebuilder.Domain.Entities.Guids.Enums;

namespace Homebuilder.Domain.Entities.Guids
{
    [Table("UtilityBills")]
    public class UtilityBill : BaseGuidEntity
    {
        public int Year { get; set; }
        public decimal Price { get; set; }
        public int Month { get; set; }
        public UtilityBillName Name { get; set; }
    }
}