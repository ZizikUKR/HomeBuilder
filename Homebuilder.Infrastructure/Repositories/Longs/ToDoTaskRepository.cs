using Homebuilder.Domain.Entities.Longs;
using Homebuilder.Domain.Repositories.Longs;
using Microsoft.Extensions.Configuration;

namespace Homebuilder.Infrastructure.Repositories.Longs
{
    public class ToDoTaskRepository : BaseLongRepository<ToDoTask>, IToDoTaskRepository
    {
        public ToDoTaskRepository(IConfiguration configuration) : base(configuration, "ToDoTasks")
        {
        }
    }
}
