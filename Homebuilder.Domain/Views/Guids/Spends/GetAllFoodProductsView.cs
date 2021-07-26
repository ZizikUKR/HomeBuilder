using System;

namespace Homebuilder.Domain.Views.Guids.Foods
{
    public class GetAllSpendsView : PagedResponse<SpendGetAllViewItem>
    {
    }

    public class SpendGetAllViewItem
    {
        public string Id { get; set; }
        public DateTime CreationDate { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public int Month { get; set; }
        public DateTime OrderDay { get; set; }
        public string CategoryId { get; set; }
        public SpendCategoryView Category { get; set; }
    }
}
