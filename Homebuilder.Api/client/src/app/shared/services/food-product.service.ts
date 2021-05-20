import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateFoodProductView } from "../models/food-products/create-food-product-view";
import { GetAllFoodProductsView } from "../models/food-products/get-all-food-products";
import { UpdateFoodproductView } from "../models/food-products/update-food-product-view";

@Injectable({
    providedIn: 'root'
})
export class FoodProductService {
    readonly rootUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public GetAll(): Observable<GetAllFoodProductsView> {
        return this.http.get<GetAllFoodProductsView>(this.rootUrl + 'foodProduct/getAll');
    }

    public Delete(id: string): Observable<boolean> {
        const params = new HttpParams()
            .set('id', id.toString());

        return this.http.delete<boolean>(this.rootUrl + 'foodProduct/delete', { params })
    }

    public Update(product: UpdateFoodproductView): Observable<any> {
        return this.http.put(this.rootUrl + 'foodProduct/update', product);
    }

    public Create(product: CreateFoodProductView): Observable<any> {
        return this.http.post(this.rootUrl + 'foodProduct/create', product)
    }
}