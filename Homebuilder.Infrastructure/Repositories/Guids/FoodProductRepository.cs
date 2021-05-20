using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using Homebuilder.Domain.Entities.Guids.Foods;
using Homebuilder.Domain.Repositories.Guids.Foods;
using Microsoft.Extensions.Configuration;

namespace Homebuilder.Infrastructure.Repositories.Guids
{
    public class FoodProductRepository : BaseGuidRepository<FoodProduct>, IFoodProductRepository
    {
        public FoodProductRepository(IConfiguration configuration) : base(configuration, "FoodProducts")
        {
        }

        public async Task<IEnumerable<FoodProduct>> GetAllWithCategory()
        {
            string sql = $@"SELECT * FROM {_tableName} AS FP
                            INNER JOIN FoodCategories AS FC ON FP.CategoryId =FC.Id";

            var res = await Connection.QueryAsync<FoodProduct, FoodCategory, FoodProduct>(sql, map: (p, c) =>
            {
                p.Category = c;
                return p;
            });

            return res;
        }

        public async Task<IEnumerable<GetMonthPrice>> GetMonthPrices(int year)
        {
            string sql = $@"SELECT SUM(Price) AS MonthPrice,Month AS Month  FROM {_tableName}
                           WHERE Year=@Year
                           GROUP BY Month ORDER BY Month";

            var res = await Connection.QueryAsync<GetMonthPrice>(sql, new { Year = year });

            return res;
        }

        public async Task<IEnumerable<GetCurrentMonthSpendDto>> GetCurrentMonthSpends(int year, int month)
        {
            string sql = $@"SELECT SUM(Price) AS Price, FC.Name FROM {_tableName} AS FP
                            INNER JOIN FoodCategories AS FC ON FP.CategoryId=FC.Id
                            WHERE Year=@Year AND Month=@Month
                            GROUP BY FC.Name ORDER BY FC.Name";

            var res = await Connection.QueryAsync<GetCurrentMonthSpendDto>(sql, new { Year = year, Month = month });

            return res;
        }
    }
}
