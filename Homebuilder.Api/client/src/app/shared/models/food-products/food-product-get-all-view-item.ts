import { FoodCategoryView } from "./food-category-view";

export interface FoodProductGetAllViewItem {
    id: string;
    creationDate: Date;
    month: number;
    year: number;
    price: number;
    orderDay: Date;
    categoryId: string;
    category: FoodCategoryView;
}