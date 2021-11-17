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

  releases: Release[] = [];

  constructor(private http: HttpClient) { }
  
  getReleases(): Observable<Release[]>{
    return this.http.get<Release[]>(this.endpoint + '/releases')
  }

  getRelease(id: number): Release {
    let release: Release = null;
    this.http.get<Release>(this.endpoint + '/releases/' + id).subscribe((rel:Release) => {
      release = rel;
    });
    return release;
  }

  createRelease(): Observable<Release> {
    return this.http.get<Release[]>(this.endpoint + '/releases')[0];
  }
}
