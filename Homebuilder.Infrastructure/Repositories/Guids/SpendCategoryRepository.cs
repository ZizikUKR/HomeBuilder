using Dapper;
using Homebuilder.Domain.Entities.Guids.Spends;
using Homebuilder.Domain.Repositories.Guids.Foods;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Homebuilder.Infrastructure.Repositories.Guids
{
    public class SpendCategoryRepository : BaseGuidRepository<SpendCategory>, ISpendCategoryRepository
    {
        public SpendCategoryRepository(IConfiguration configuration) : base(configuration, "SpendCategories")
        {
        }

        public async Task<SpendCategory> GetByName(string name)
        {
            string sql = $"SELECT * FROM {_tableName} WHERE Name=@name";
            var res = await Connection.QueryFirstOrDefaultAsync<SpendCategory>(sql, new { name });

            return res;
        }
    }
}
