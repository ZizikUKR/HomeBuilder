import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { GetMonthFoodChartDataView } from "../models/food-products/charts/get-mont-food-chart-view";

@Injectable({
    providedIn: 'root'
})
export class FoodChartService {
    readonly rootUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public getMonthFoodChartData(): Observable<GetMonthFoodChartDataView> {
        return this.http.get<GetMonthFoodChartDataView>(this.rootUrl + 'foodChart/getFoodChartData');
    }
}