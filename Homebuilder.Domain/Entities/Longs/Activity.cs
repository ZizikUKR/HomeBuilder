using Dapper.Contrib.Extensions;
using System;

namespace Homebuilder.Domain.Entities.Longs
{
    [Table("Activities")]
    public class Activity : BaseLongEntity
    {
        public DateTime ScheduledDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
    }
}
