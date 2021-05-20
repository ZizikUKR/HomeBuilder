using Homebuilder.Domain.Entities.Longs;
using Homebuilder.Domain.Repositories.Longs;
using Homebuilder.Domain.Views;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Homebuilder.Domain.Views.Longs.Enums;
using Homebuilder.Domain.Views.Longs.Todos;

namespace Homebuilder.Domain.Queries.Longs.ToDos
{
    public class GetAllTodosQuery
    {
        public class Query: IRequest<GetAllToDoView> { }

        public class Handler : IRequestHandler<Query, GetAllToDoView>
        {
            private readonly IToDoTaskRepository _toDoTaskRepository;
            public Handler(IToDoTaskRepository toDoTaskRepository)
            {
                _toDoTaskRepository = toDoTaskRepository;
            }

            public async Task<GetAllToDoView> Handle(Query request, CancellationToken cancellationToken)
            {
                IEnumerable<ToDoTask> existingToDos = await _toDoTaskRepository.GetAll();
                var result = new GetAllToDoView();
                result.ToDos = existingToDos.Select(p => MapToDoTaskToView(p)).OrderBy(p => p.ToDo).ToList();

                return result;
            }

            private ToDoTaskGetAllViewItem MapToDoTaskToView(ToDoTask entity)
            {
                var result = new ToDoTaskGetAllViewItem();
                if (!Enum.TryParse(entity.State.ToString(), out StateEnumView state))
                {
                    throw new Exception("Can't parse ToDo State");
                }
                result.Id = entity.id;
                result.Description = entity.Description;
                result.Information = entity.Information;
                result.IsComppleted = entity.IsComppleted;
                result.ToDo = entity.ToDo;
                result.CreationDate = entity.CreationDate;
                result.State = state;

                return result;
            }
        }
    }
}
