using System.Collections.Generic;

namespace Homebuilder.Domain.Views.Guids.Foods
{
    public class GetMonthSpendsChartDataView
    {
        public List<string> Months { get; set; } = new List<string>();
        public List<int> MonthPrices { get; set; } = new List<int>();
        public List<int> CurrentMonthCategoryPrices { get; set; } = new List<int>();
        public List<string> CurrentMonthCategories { get; set; } = new List<string>();
    }
}
