using Dapper.Contrib.Extensions;
using Homebuilder.Domain.Entities.Guids;
using Homebuilder.Domain.Repositories.Guids;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Homebuilder.Infrastructure.Repositories.Guids
{
    public class BaseGuidRepository<T> : IBaseGuidRepository<T> where T : BaseGuidEntity
    {
        protected readonly string _tableName;
        private string _connectionString;

        protected IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }
        public BaseGuidRepository(IConfiguration configuration, string tableName)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            _tableName = tableName;
        }

        public async Task<T> Get(Guid id)
        {
            return await Connection.GetAsync<T>(id);
        }

        public async Task<IEnumerable<T>> GetAll()
        { 
            return await Connection.GetAllAsync<T>();
        }

        public virtual async Task Update(T entity)
        {
            await Connection.UpdateAsync(entity);
        }

        public async Task Add(T item)
        {
            await Connection.InsertAsync(item);
        }

        public async Task Add(IEnumerable<T> entities)
        {
            await Connection.InsertAsync(entities);
        }

        public async Task<bool> Delete(T entity)
        {
            return await Connection.DeleteAsync(entity);
        }
    }
}
