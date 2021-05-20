import { FoodCategoryView } from "./food-category-view";

export interface UpdateFoodproductView{
    id: string;
    month: number;
    year: number;
    price: number;
    orderDay: Date;
    category: FoodCategoryView;
}