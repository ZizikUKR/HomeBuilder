using System.Collections.Generic;

namespace Homebuilder.Domain.Views
{
    public abstract class PagedResponse<T> where T:class
    {
        public List<T> Items { get; set; } = new List<T>();

        public int Page { get; set; }
        public int PageSize { get; set; }
        public int Count { get; set; }
    }
}
