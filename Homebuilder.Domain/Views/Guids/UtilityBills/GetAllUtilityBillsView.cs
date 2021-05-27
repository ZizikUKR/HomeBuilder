using Homebuilder.Domain.Views.Guids.Enums;
using System;
using System.Collections.Generic;

namespace Homebuilder.Domain.Views.Guids.UtilityBills
{
    public class GetAllUtilityBillsView
    {
        public IEnumerable<UtilityBillGetAllViewItem> Items { get; set; } = new List<UtilityBillGetAllViewItem>();
    }

    public class UtilityBillGetAllViewItem
    {
        public string Id { get; set; }
        public DateTime CreationDate { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public int Month { get; set; }
        public UtilityBillNameEnumView Name { get; set; }
    }

}
