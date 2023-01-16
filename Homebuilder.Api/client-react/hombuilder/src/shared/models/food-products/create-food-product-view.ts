import { FoodCategoryView } from "./food-category-view";

export interface CreateFoodProductView{
    month: number;
    year: number;
    price: number;
    orderDay?: Date;
    category: string;
}