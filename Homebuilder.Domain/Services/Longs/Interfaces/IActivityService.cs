using Homebuilder.Domain.Views.Longs.Activities;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Services.Longs.Interfaces
{
    public interface IActivityService
    {
        Task<GetAllActivityView> GetAll();
        Task Create(CreateActivity activity);
    }
}
