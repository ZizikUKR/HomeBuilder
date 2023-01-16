import { FoodCategoryView } from "../food-products/food-category-view";

export interface UpdateWasteproductView{
    id: string;
    month: number;
    year: number;
    price: number;
    orderDay: Date;
    category: FoodCategoryView;
}