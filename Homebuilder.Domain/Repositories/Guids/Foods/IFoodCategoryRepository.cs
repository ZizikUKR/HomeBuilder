using Homebuilder.Domain.Entities.Guids.Foods;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Repositories.Guids.Foods
{
    public interface IFoodCategoryRepository : IBaseGuidRepository<FoodCategory>
    {
        Task<FoodCategory> GetByName(string name);
    }
}
