namespace Homebuilder.Domain.Helpers
{
    public static class PaginationHelper
    {
        public static int CalculateSkiptedItems(int page, int pageSize)
        {
            return (page - 1) * pageSize;
        }
    }
}
