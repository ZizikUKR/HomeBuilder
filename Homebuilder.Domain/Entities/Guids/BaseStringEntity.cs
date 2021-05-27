using System;
using Dapper.Contrib.Extensions;

namespace Homebuilder.Domain.Entities.Guids
{
    public abstract class BaseStringEntity
    {
        [ExplicitKey]
        public string Id { get; set; }

        public DateTime CreationDate { get; set; }
        public BaseStringEntity()
        {
            Id = Guid.NewGuid().ToString();
            CreationDate = DateTime.UtcNow;
        }
    }
}
