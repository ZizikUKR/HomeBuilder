using Homebuilder.Domain.Entities.Longs;
using Homebuilder.Domain.Entities.Longs.Enums;
using Homebuilder.Domain.Repositories.Longs;
using Homebuilder.Domain.Services.Longs.Interfaces;
using Homebuilder.Domain.Views.Longs.Enums;
using Homebuilder.Domain.Views.Longs.Todos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Services.Longs
{
    public class ToDoService : IToDoService
    {
        private readonly IToDoTaskRepository _toDoTaskRepository;
        public ToDoService(IToDoTaskRepository toDoTaskRepository)
        {
            _toDoTaskRepository = toDoTaskRepository;
        }



        #region Public Methods
        public async Task<bool> Create(CreateToDoView view)
        {
            await _toDoTaskRepository.Add(MapViewToToDo(view));

            return true;
        }

        public async Task<bool> Delete(int id)
        {
            ToDoTask existingTask = await _toDoTaskRepository.Get(id);
            if (existingTask is null)
            {
                throw new Exception("ToDoTask doesn't exist");
            }

            return await _toDoTaskRepository.Delete(existingTask);
        }

        public async Task<GetAllToDoView> GetAll()
        {
            IEnumerable<ToDoTask> existingToDos = await _toDoTaskRepository.GetAll();
            var result = new GetAllToDoView();
            result.ToDos = existingToDos.Select(p => MapToDoTaskToView(p)).OrderBy(p => p.ToDo).ToList();

            return result;
        }

        public async Task<bool> Update(UpdateToDoView view)
        {
            ToDoTask toDoTask = await _toDoTaskRepository.Get(view.Id);
            if (toDoTask is null)
            {
                throw new Exception("TodoTask dosen't exist");
            }
            toDoTask.IsComppleted = view.IsComppleted;
            await _toDoTaskRepository.Update(toDoTask);

            return true;
        }
        #endregion Public Methods

        #region Mapping      
        private ToDoTask MapViewToToDo(CreateToDoView view)
        {
            var res = new ToDoTask();
            res.ToDo = view.ToDo;
            res.Information = view.Information;
            res.Description = view.Description;
            res.State = State.Medium;
            res.IsComppleted = false;

            return res;
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
        #endregion Mapping 
    }
}
