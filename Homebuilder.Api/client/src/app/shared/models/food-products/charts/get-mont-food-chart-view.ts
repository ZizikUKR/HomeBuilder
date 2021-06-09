export interface GetMonthFoodChartDataView{
    months: Array<string>;
    monthPrices:Array<number>;

    currentMonthCategoryPrices:Array<number>;
    currentMonthCategories: Array<string>;
}