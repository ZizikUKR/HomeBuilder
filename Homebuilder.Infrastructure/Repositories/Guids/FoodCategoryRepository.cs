using System.Threading.Tasks;
using Dapper;
using Homebuilder.Domain.Entities.Guids.Foods;
using Homebuilder.Domain.Repositories.Guids.Foods;
using Microsoft.Extensions.Configuration;

namespace Homebuilder.Infrastructure.Repositories.Guids
{
    public class FoodCategoryRepository : BaseGuidRepository<FoodCategory>, IFoodCategoryRepository
    {
        public FoodCategoryRepository(IConfiguration configuration) : base(configuration, "FoodCategories")
        {
        }

        public async Task<FoodCategory> GetByName(string name)
        {
            string sql = $"SELECT * FROM {_tableName} WHERE Name=@name";
            var res = await Connection.QueryFirstOrDefaultAsync<FoodCategory>(sql, new { name });

            return res;
        }
    }
}
