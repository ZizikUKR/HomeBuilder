import { FoodProductGetAllViewItem } from "./food-product-get-all-view-item";

export interface GetAllFoodProductsView {
    items?: Array<FoodProductGetAllViewItem>;
    page:number;
    pageSize:number;
    count:number;
}