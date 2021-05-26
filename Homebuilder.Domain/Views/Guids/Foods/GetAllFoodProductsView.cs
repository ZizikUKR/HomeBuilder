using System;
using System.Collections.Generic;

namespace Homebuilder.Domain.Views.Guids.Foods
{
    public class GetAllFoodProductsView
    {
        public IEnumerable<FoodProductGetAllViewItem> Items { get; set; } = new List<FoodProductGetAllViewItem>();
    }

    public class FoodProductGetAllViewItem
    {
        public string Id { get; set; }
        public DateTime CreationDate { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public int Month { get; set; }
        public DateTime OrderDay { get; set; }
        public string CategoryId { get; set; }
        public FoodCategoryView Category { get; set; }
    }
}
