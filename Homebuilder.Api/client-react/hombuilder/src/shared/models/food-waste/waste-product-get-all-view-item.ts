import { FoodCategoryView } from "../food-products/food-category-view";

export interface WasteProductGetAllViewItem {
    id: string;
    creationDate: Date;
    month: number;
    year: number;
    price: number;
    orderDay: Date;
    categoryId: string;
    category: FoodCategoryView;
}