using Homebuilder.Domain.Entities.Guids.Spends;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Repositories.Guids.Foods
{
    public interface ISpendCategoryRepository : IBaseGuidRepository<SpendCategory>
    {
        Task<SpendCategory> GetByName(string name);
    }
}
