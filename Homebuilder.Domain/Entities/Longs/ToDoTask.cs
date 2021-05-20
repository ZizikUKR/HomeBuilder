using Homebuilder.Domain.Entities.Longs.Enums;

namespace Homebuilder.Domain.Entities.Longs
{
    public class ToDoTask : BaseLongEntity
    {
        public string ToDo { get; set; }
        public string Description { get; set; }
        public string Information { get; set; }
        public bool IsComppleted { get; set; }
        public State State { get; set; }
    }
}
