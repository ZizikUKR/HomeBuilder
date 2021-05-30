using Dapper;
using Homebuilder.Domain.Entities.Guids.Foods;
using Homebuilder.Domain.Repositories.Guids.Foods;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Homebuilder.Infrastructure.Repositories.Guids
{
    public class FoodProductRepository : BaseGuidRepository<FoodProduct>, IFoodProductRepository
    {
        public FoodProductRepository(IConfiguration configuration) : base(configuration, "FoodProducts")
        {
        }

        public async Task<IEnumerable<FoodProduct>> GetAllPagedWithFilters(int skippedItems, int pageSize, string category, int year, int month)
        {
            string sql = $@"SELECT * FROM {_tableName} AS FP
                            INNER JOIN FoodCategories AS FC ON FP.CategoryId =FC.Id
                            ORDER BY CreationDate DESC
                            LIMIT @PageSize OFFSET @SkippedItems";

            var res = await Connection.QueryAsync<FoodProduct, FoodCategory, FoodProduct>(sql, map: (p, c) =>
            {
                p.Category = c;
                return p;
            }, new { SkippedItems = skippedItems, PageSize = pageSize });

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

        public async Task<int> GetCount(string category, int year, int month = 0)
        {
            var builder = new StringBuilder($@"SELECT COUNT(*) FROM {_tableName} AS FP
                            INNER JOIN FoodCategories AS FC ON FP.CategoryId=FC.Id
                            WHERE Year=@Year");

            if (month > 0)
            {
                builder.Append(" AND Month=@Month");
            }
            if (!string.IsNullOrWhiteSpace(category))
            {
                builder.Append(" AND FC.Name=@Category");
            }
            builder.Append(" ORDER BY FC.CreationDate DESC");

            var res = await Connection.QueryFirstOrDefaultAsync<int>(builder.ToString(), new { Year = year, Category = category, Month = month });

            return res;
        }
    }
}
