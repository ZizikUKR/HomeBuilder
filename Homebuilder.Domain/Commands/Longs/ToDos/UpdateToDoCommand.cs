using Homebuilder.Domain.Entities.Longs;
using Homebuilder.Domain.Repositories.Longs;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Commands.Longs.ToDos
{
    public  class UpdateToDoCommand
    {
        public class Command : IRequest
        {
            public long Id { get; set; }
            public bool IsComppleted { get; set; }
        }

        public class Handler : AsyncRequestHandler<Command>
        {
            private readonly IToDoTaskRepository _toDoTaskRepository;
            public Handler(IToDoTaskRepository toDoTaskRepository)
            {
                _toDoTaskRepository = toDoTaskRepository;
            }
            protected async override Task Handle(Command request, CancellationToken cancellationToken)
            {
                ToDoTask toDoTask = await _toDoTaskRepository.Get(request.Id);
                if (toDoTask is null)
                {
                    throw new Exception("TodoTask dosen't exist");
                }
                toDoTask.IsComppleted = request.IsComppleted;
                await _toDoTaskRepository.Update(toDoTask);
            }
        }
    }
}
