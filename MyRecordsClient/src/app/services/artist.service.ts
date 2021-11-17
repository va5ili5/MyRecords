import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../domain/artist.model';

@Injectable({
  providedIn: 'root'
})

export class ArtistService {
  endpoint = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  artists: Artist[] = [];

  constructor(private http: HttpClient) { }
  
  getArtists(): Observable<Artist[]>{
    return this.http.get<Artist[]>(this.endpoint + '/artists')
  }

  getArtist(id: number): Artist {
    let artist: Artist = null;
    this.http.get<Artist>(this.endpoint + '/artists' + id).subscribe((art:Artist) => {
        artist = art;
    });
    return artist;
  }

  createRelease(): Observable<Artist> {
    return this.http.get<Artist[]>(this.endpoint + '/artists')[0];
  }
}
