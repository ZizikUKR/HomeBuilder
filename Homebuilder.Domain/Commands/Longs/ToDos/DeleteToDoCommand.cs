using Homebuilder.Domain.Entities.Longs;
using Homebuilder.Domain.Repositories.Longs;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Commands.Longs.ToDos
{
    public class DeleteToDoCommand
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
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
                ToDoTask existingTask = await _toDoTaskRepository.Get(request.Id);
                if (existingTask is null)
                {
                    throw new Exception("ToDoTask doesn't exist");
                }

                await _toDoTaskRepository.Delete(existingTask);
            }
        }
    }
}
