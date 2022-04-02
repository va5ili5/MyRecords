import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Format } from '../domain/format.model';

@Injectable({
  providedIn: 'root'
})
export class FormatService {
  endpoint = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  formats: Format[] = [];

  constructor(private http: HttpClient) { }

  getFormats(): Observable<Format[]>{
    return this.http.get<Format[]>(this.endpoint + '/formats')
  }
}
