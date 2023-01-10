import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Label } from '../domain/label.model';
import { PagedService } from './paged.service';

@Injectable({
  providedIn: 'root'
})

export class LabelService{
  endpoint = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  labels: Label[] = [];

  constructor(private http: HttpClient) {
    //super();
  }

  getLabels(term: string = null, page: number ): Observable<Label[]>{
    if(term) {
      return this.http.get<Label[]>(this.endpoint + `/labels?s=${term}&page=${page}`);
    } else {
      return of([]);
    }
  }

  getLabel(id: number): Label {
    let label: Label = null;
    this.http.get<Label>(this.endpoint + '/labels' + id).subscribe((lab:Label) => {
        label = lab;
    });
    return label;
  }

  createRelease(): Observable<Label> {
    return this.http.get<Label[]>(this.endpoint + '/labels')[0];
  }
}
