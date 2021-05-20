using System.Collections.Generic;

namespace Homebuilder.Domain.Views.Longs.Activities
{
    public class GetAllActivityView
    {
        public List<ActivityGetAllViewItem> Activities { get; set; } = new List<ActivityGetAllViewItem>();
    }
    public class ActivityGetAllViewItem
    {
        public long id { get; set; }
        public string CreationDate { get; set; }
        public string ScheduledDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
    }
}
