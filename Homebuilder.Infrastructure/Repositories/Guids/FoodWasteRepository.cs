using Homebuilder.Domain.Entities.Guids.Foods;
using Homebuilder.Domain.Repositories.Guids.Foods;
using Microsoft.Extensions.Configuration;

namespace Homebuilder.Infrastructure.Repositories.Guids
{
    public class FoodWasteRepository : BaseGuidRepository<FoodWaste>, IFoodWasteRepository
    {
        public FoodWasteRepository(IConfiguration configuration) : base(configuration, "FoodWastes")
        {
        }
    }
}
