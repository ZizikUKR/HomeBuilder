using Homebuilder.Domain.Entities.Longs;
using Homebuilder.Domain.Repositories.Longs;
using Microsoft.Extensions.Configuration;

namespace Homebuilder.Infrastructure.Repositories.Longs
{
    public class ActivityRepository : BaseLongRepository<Activity>, IActivityRepository
    {
        public ActivityRepository(IConfiguration configuration) : base(configuration, "Activities")
        {
        }
    }
}
