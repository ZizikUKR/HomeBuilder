using System.Collections.Generic;
using Homebuilder.Domain.Entities.Guids;
using System.Threading.Tasks;
using Homebuilder.Domain.Entities.Guids.Foods;

namespace Homebuilder.Domain.Repositories.Guids
{
    public interface IUtilityBillRepository : IBaseGuidRepository<UtilityBill>
    {
        Task<IEnumerable<GetMonthPrice>> GetMonthPrices(int year);
        Task<IEnumerable<GetCurrentMonthSpendDto>> GetCurrentMonthSpends(int year, int month);
    }
}
