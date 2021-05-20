using Homebuilder.Domain.Views.Longs.Todos;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Services.Longs.Interfaces
{
    public interface IToDoService
    {
        Task<GetAllToDoView> GetAll();
        Task<bool> Update(UpdateToDoView view);
        Task<bool> Create(CreateToDoView view);
        Task<bool> Delete(int id);
    }
}
