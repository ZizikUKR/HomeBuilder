using System;
using Dapper.Contrib.Extensions;

namespace Homebuilder.Domain.Entities.Guids
{
    public abstract class BaseGuidEntity
    {
        [ExplicitKey]
        public Guid Id { get; set; }

        public DateTime CreationDate { get; set; }
        public BaseGuidEntity()
        {
            Id = Guid.NewGuid();
            CreationDate = DateTime.UtcNow;
        }
    }
}
