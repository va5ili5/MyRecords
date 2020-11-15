import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Release } from '../domain/release.model';

@Injectable({
  providedIn: 'root'
})

export class ReleaseService {
  endpoint = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }
  releases: Release[] = [];
  getReleases(): Observable<Release[]>{
    return this.http.get<Release[]>(this.endpoint + '/releases')
  }
}
