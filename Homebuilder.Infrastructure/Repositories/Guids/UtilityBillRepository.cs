using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using Homebuilder.Domain.Entities.Guids;
using Homebuilder.Domain.Entities.Guids.Foods;
using Homebuilder.Domain.Repositories.Guids;
using Microsoft.Extensions.Configuration;

namespace Homebuilder.Infrastructure.Repositories.Guids
{
    public class UtilityBillRepository : BaseGuidRepository<UtilityBill>, IUtilityBillRepository
    {
        public UtilityBillRepository(IConfiguration configuration) : base(configuration, "UtilityBills")
        {
        }
        public async Task<IEnumerable<GetMonthPrice>> GetMonthPrices(int year)
        {
            string sql = $@"SELECT SUM(Price) AS MonthPrice,Month AS Month  FROM {_tableName}
                           WHERE Year=@Year
                           GROUP BY Month ORDER BY Month";

            var res = await Connection.QueryAsync<GetMonthPrice>(sql, new { Year = year });

            return res;
        }

        public async Task<IEnumerable<GetCurrentUtilityBillMonthSpendDto>> GetCurrentMonthSpends(int year, int month)
        {
            string sql = $@"SELECT SUM(Price) AS Price, Name FROM {_tableName}
                            WHERE Year=@Year AND Month=@Month
                            GROUP BY Name ORDER BY Name";

            var res = await Connection.QueryAsync<GetCurrentUtilityBillMonthSpendDto>(sql, new { Year = year, Month = month });

            return res;
        }
    }
}
