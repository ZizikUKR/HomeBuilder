using Dapper.Contrib.Extensions;

namespace Homebuilder.Domain.Entities.Guids.Foods
{
    [Table("FoodCategories")]

    public class FoodCategory : BaseStringEntity
    {
        public string Name { get; set; }
    }
}
