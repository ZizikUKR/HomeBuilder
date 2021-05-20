using Homebuilder.Domain.Views.Longs.Enums;
using System;
using System.Collections.Generic;

namespace Homebuilder.Domain.Views.Longs.Todos
{
    public class GetAllToDoView
    {
        public List<ToDoTaskGetAllViewItem> ToDos { get; set; } = new List<ToDoTaskGetAllViewItem>();
    }
    public class ToDoTaskGetAllViewItem
    {
        public long Id { get; set; }
        public DateTime CreationDate { get; set; }
        public string ToDo { get; set; }
        public string Description { get; set; }
        public string Information { get; set; }
        public bool IsComppleted { get; set; }
        public StateEnumView State { get; set; }
    }
}
