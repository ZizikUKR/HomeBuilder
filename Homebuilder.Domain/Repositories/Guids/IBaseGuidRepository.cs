using Homebuilder.Domain.Entities.Guids;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Repositories.Guids
{
    public interface IBaseGuidRepository<T> where T : BaseStringEntity
    {
        Task<T> Get(string id);

        Task<IEnumerable<T>> GetAll();

        Task Add(T item);

        Task Add(IEnumerable<T> entity);

        Task<bool> Delete(T entity);

        Task Update(T entity);

    }
}
