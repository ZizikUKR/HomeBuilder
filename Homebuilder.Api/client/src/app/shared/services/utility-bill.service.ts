import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateUtilityBillView } from "../models/utility-bills/create-utility-bill-view";
import { GetAllUtilityBillsView } from "../models/utility-bills/get-all-utility-bills-view";
import { UpdateUtilityBillView } from "../models/utility-bills/update-utility-bill-view";

Injectable({
    providedIn: 'root'
})
export class UtilityBillService {
    readonly rootUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public getAll(): Observable<GetAllUtilityBillsView> {
        return this.http.get<GetAllUtilityBillsView>(this.rootUrl + 'utilityBill/getAll');
      }

    public delete(id: string): Observable<boolean> {
        const params = new HttpParams()
            .set('id', id.toString());

        return this.http.delete<boolean>(this.rootUrl + 'utilityBill/delete', { params })
    }

    public update(product: UpdateUtilityBillView): Observable<any> {
        return this.http.put(this.rootUrl + 'utilityBill/update', product);
    }

    public create(product: CreateUtilityBillView): Observable<any> {
        return this.http.post(this.rootUrl + 'utilityBill/create', product)
    }
}