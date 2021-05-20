import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllActivityView } from '../models/activities/get-all-activity-view';
import { CreateActivityView } from '../models/activities/create-activity-view';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    readonly rootUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public GetAll(): Observable<GetAllActivityView> {
        return this.http.get<GetAllActivityView>(this.rootUrl + 'activity/getAll');
    }

    public Create(activity: CreateActivityView): Observable<any> {
        return this.http.post(this.rootUrl + 'activity/create', activity);
    }
}
