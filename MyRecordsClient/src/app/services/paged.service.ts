import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class PagedService<T> {
  endpoint = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected http: HttpClient){
  }

  getAll(actionUrl:string, term: string = null, page: number):Observable<T[]> {
    // if(term) {
    //   return this.http.get<Country[]>(this.endpoint + `/countries?s=${term}&page=${page}`);
    // } else {
    //   return of([]);
    // }
  if(term) {
    return this.http.get(this.endpoint + `/` + actionUrl + `?s=${term}&page=${page}`) as Observable<T[]>;
  } else {
    return of([]);
  }
  // getOne(id:number):Observable<T> {
  //   return this.http.get(`${this.actionUrl}${id}`).map(resp=>resp.json() as T);
  // }
  }
}
