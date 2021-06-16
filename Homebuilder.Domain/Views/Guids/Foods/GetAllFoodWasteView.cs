using System.Collections.Generic;

namespace Homebuilder.Domain.Views.Guids.Foods
{
    public class GetAllFoodWasteView
    {
        public List<FoodWasteGetAllViewItem> Items { get; set; } = new List<FoodWasteGetAllViewItem>();
    }

    public class FoodWasteGetAllViewItem
    {
        public string Id { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public string CategoryId { get; set; }
        public FoodCategoryView Category { get; set; }
    }
}
