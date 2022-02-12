using System.Collections.Generic;
using System.Threading.Tasks;
using Homebuilder.Domain.Entities.Guids.Foods;

namespace Homebuilder.Domain.Repositories.Guids.Foods
{
    public interface IFoodProductRepository : IBaseGuidRepository<FoodProduct>
    {
        Task<IEnumerable<FoodProduct>> GetAllPagedWithFilters(int skippedItems, int pageSize, string category, int year, int month);
        Task<IEnumerable<GetMonthPrice>> GetMonthPrices(int year);
        Task<int> GetCount(string category, int year, int month);
        Task<IEnumerable<GetCurrentMonthSpendDto>> GetCurrentMonthSpends(int year, int month);
    }
}
