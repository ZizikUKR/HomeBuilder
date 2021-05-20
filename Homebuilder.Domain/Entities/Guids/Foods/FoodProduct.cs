using System;
using Dapper.Contrib.Extensions;

namespace Homebuilder.Domain.Entities.Guids.Foods
{
    [Table("FoodProducts")]

    public class FoodProduct : BaseGuidEntity
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public DateTime OrderDay { get; set; }
        public decimal Price { get; set; }
        public Guid CategoryId { get; set; }
        [Computed]
        public virtual FoodCategory Category { get; set; }
    }
}
