using System.Collections.Generic;
using System.Threading.Tasks;
using Homebuilder.Domain.Entities.Guids.Foods;

namespace Homebuilder.Domain.Repositories.Guids.Foods
{
    public interface IFoodProductRepository : IBaseGuidRepository<FoodProduct>
    {
        Task<IEnumerable<FoodProduct>> GetAllWithCategory();
        Task<IEnumerable<GetMonthPrice>> GetMonthPrices(int year);
        Task<IEnumerable<GetCurrentMonthSpendDto>> GetCurrentMonthSpends(int year, int month);
    }
}
