import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormsDataDto } from '../dto/forms-data-dto';

@Injectable({
  providedIn: 'root'
})
export class FormsdataService {
  endpoint = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getFormsData(): Observable<FormsDataDto>{
    return this.http.get<FormsDataDto>(this.endpoint + '/formsdata')
  }
}
