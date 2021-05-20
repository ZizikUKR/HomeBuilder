using Homebuilder.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Homebuilder.Domain.Entities.Longs;

namespace Homebuilder.Domain.Repositories.Longs
{
    public interface IBaseLongRepository<T> where T : BaseLongEntity
    {
        Task<T> Get(long id);

        Task<IEnumerable<T>> GetAll();

        Task Add(T item);

        Task Add(IEnumerable<T> entity);

        Task<bool> Delete(T entity);

        Task Update(T entity);

    }
}
