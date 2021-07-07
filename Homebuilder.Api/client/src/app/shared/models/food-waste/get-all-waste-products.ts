import { WasteProductGetAllViewItem } from "./waste-product-get-all-view-item";

export interface GetAllWasteProductsView {
    items?: Array<WasteProductGetAllViewItem>;
    page:number;
    pageSize:number;
    count:number;
}