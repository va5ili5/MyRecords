import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../domain/country.model';
import { PagedService } from './paged.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  endpoint = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  countries: Country[] = [];

  constructor(private http: HttpClient) {
    //super();
  }

  getCountries(term: string = null, page: number ): Observable<Country[]>{
    if(term) {
      return this.http.get<Country[]>(this.endpoint + `/countries?s=${term}&page=${page}`);
    } else {
      return of([]);
    }
  }
}
