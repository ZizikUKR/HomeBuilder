using Homebuilder.Domain.Entities.Longs;
using Homebuilder.Domain.Entities.Longs.Enums;
using Homebuilder.Domain.Repositories.Longs;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Commands.Longs.ToDos
{
    public class CreateToDoCommand
    {
        public class Command : IRequest
        {
            public string Description { get; set; }
            public string Information { get; set; }
            public string ToDo { get; set; }
        }

        public class Handler : AsyncRequestHandler<Command>
        {
            private readonly IToDoTaskRepository _toDoTaskRepository;
            public Handler(IToDoTaskRepository toDoTaskRepository)
            {
                _toDoTaskRepository = toDoTaskRepository;
            }

            protected override async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _toDoTaskRepository.Add(MapViewToToDo(request));
            }

            private ToDoTask MapViewToToDo(Command view)
            {
                var res = new ToDoTask();
                res.ToDo = view.ToDo;
                res.Information = view.Information;
                res.Description = view.Description;
                res.State = State.Medium;
                res.IsComppleted = false;

                return res;
            }
        }
    }
}
