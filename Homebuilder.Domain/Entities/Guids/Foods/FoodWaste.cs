using System;
using Dapper.Contrib.Extensions;

namespace Homebuilder.Domain.Entities.Guids.Foods
{
    [Table("FoodWastes")]
    public class FoodWaste : BaseStringEntity
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public string CategoryId { get; set; }
        [Computed]
        public virtual FoodCategory Category { get; set; }
    }
}
