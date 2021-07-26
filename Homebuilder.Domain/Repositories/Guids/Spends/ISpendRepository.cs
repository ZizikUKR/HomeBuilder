using Homebuilder.Domain.Entities.Guids.Foods;
using Homebuilder.Domain.Entities.Guids.Spends;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Repositories.Guids.Foods
{
    public interface ISpendRepository : IBaseGuidRepository<Spend>
    {
        Task<IEnumerable<Spend>> GetAllPagedWithFilters(int skippedItems, int pageSize, string category, int year, int month);
        Task<IEnumerable<GetMonthPrice>> GetMonthPrices(int year);
        Task<int> GetCount(string category, int year, int month);
        Task<IEnumerable<GetCurrentMonthSpendDto>> GetCurrentMonthSpends(int year, int month);
    }
}
