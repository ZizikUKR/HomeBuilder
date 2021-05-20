using Homebuilder.Domain.Entities.Guids;
using Homebuilder.Domain.Repositories.Guids;
using Microsoft.Extensions.Configuration;

namespace Homebuilder.Infrastructure.Repositories.Guids
{
    public class UtilityBillRepository : BaseGuidRepository<UtilityBill>, IUtilityBillRepository
    {
        public UtilityBillRepository(IConfiguration configuration) : base(configuration, "UtilityBills")
        {
        }
    }
}
