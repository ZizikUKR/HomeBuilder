import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateWasteProductView } from "../models/food-waste/create-waste-product-view";
import { GetAllWasteProductsView } from "../models/food-waste/get-all-waste-products";
import { UpdateWasteproductView } from "../models/food-waste/update-waste-product-view";

@Injectable({
    providedIn: 'root'
})
export class WasteProductService {
    readonly rootUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public GetAll(page: number, pageSize: number, category: string, month: number): Observable<GetAllWasteProductsView> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());
        if (category) {
            params = params.set('category', category);
        }
        if (month) {
            params.set('month', month.toString());
        }
        return this.http.get<GetAllWasteProductsView>(this.rootUrl + 'wasteProduct/getAll', { params: params });
    }

    public Delete(id: string): Observable<boolean> {
        const params = new HttpParams()
            .set('id', id.toString());

        return this.http.delete<boolean>(this.rootUrl + 'wasteProduct/delete', { params })
    }

    public Update(product: UpdateWasteproductView): Observable<any> {
        return this.http.put(this.rootUrl + 'wasteProduct/update', product);
    }

    public Create(product: CreateWasteProductView): Observable<any> {
        return this.http.post(this.rootUrl + 'wasteProduct/create', product)
    }
}