using Dapper.Contrib.Extensions;

namespace Homebuilder.Domain.Entities.Guids.Spends
{
    [Table("SpendCategories")]

    public class SpendCategory : BaseStringEntity
    {
        public string Name { get; set; }
    }
}
