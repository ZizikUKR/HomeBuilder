using Dapper.Contrib.Extensions;
using System;

namespace Homebuilder.Domain.Entities.Longs
{
    public class BaseLongEntity
    {
        [Key]
        public long id { get; set; }

        public DateTime CreationDate { get; set; }
        public BaseLongEntity()
        {
            CreationDate = DateTime.UtcNow;
        }
    }
}
