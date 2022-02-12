import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateToDoView } from '../models/to-do/update-to-do-view';
import { CreateToDoView } from '../models/to-do/create-to-do-view';
import { GetAllToDoView } from '../models/to-do/get-all-to-do-view';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  readonly rootUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<GetAllToDoView> {
    return this.http.get<GetAllToDoView>(this.rootUrl + 'toDo/getAll');
  }

  public update(item: UpdateToDoView): Observable<boolean> {
    return this.http.put<boolean>(this.rootUrl + 'toDo/update', item);
  }

  public create(item: CreateToDoView): Observable<boolean> {
    return this.http.post<boolean>(this.rootUrl + 'toDo/create', item);
  }

  public delete(id: number): Observable<boolean> {
    const params = new HttpParams()
        .set('id', id.toString());
    return this.http.delete<boolean>(this.rootUrl + 'toDo/delete', {params});
  }

}
