import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { GetAllFoodCategoriesView } from "../models/food-products/get-all-food-categories-view";

@Injectable({
    providedIn: 'root'
})
export class FoodCategoryService {
    readonly rootUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public getProductCreationData(): Observable<GetAllFoodCategoriesView> {
        return this.http.get<GetAllFoodCategoriesView>(this.rootUrl + 'foodCategory/getProductCreationData');
    }   
}