namespace Homebuilder.Domain.Views
{
    public abstract class PagedRequest
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
