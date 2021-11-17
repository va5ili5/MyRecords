import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Country } from 'src/app/domain/country.model';
import { Format } from 'src/app/domain/format.model';
import { Genre } from 'src/app/domain/genre.model';
import { Release } from 'src/app/domain/release.model';
import { FormsDataDto } from 'src/app/dto/forms-data-dto';
import { FormsdataService } from 'src/app/services/formsdata.service';
import { ReleaseService } from 'src/app/services/release.service';

import {map, startWith} from 'rxjs/operators';
import { ArtistService } from 'src/app/services/artist.service';
import { Artist } from 'src/app/domain/artist.model';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {
  panelOpenState = false;
  private mode = 'create';
  private releaseId: number;
  private release: Release;

  public countries: Country[] = [];
  public formats: Format[] = [];
  public genres: Genre[] = [];

  
  myControl = new FormControl();
  options$: Observable<Artist[]>;
  
  artists: Artist[] = [];

  dataSource: MatTableDataSource<Artist> = null;
  displayedColumns = ['name'];

  constructor(public releaseService: ReleaseService, public formsDataService: FormsdataService, public route: ActivatedRoute, public artistService: ArtistService) {
    artistService.getArtists().subscribe(res => {
      //this.dataSource = new MatTableDataSource(res);
      //this.artists = res;
      
    })
    
    
    //this.options$ = artistService.getArtists()
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if(paraMap.has('id')){
        this.mode = 'edit';
        this.releaseId = +paraMap.get('id');
        this.release = this.releaseService.getRelease(this.releaseId);
        this.dataSource = new MatTableDataSource(this.release.artists);
        this.artists = this.release.artists;
        this.options$ = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(name => (name ? this._filter(name) : this.artists.slice())),
        );
      } else {
        this.mode = 'create';
        this.formsDataService.getFormsData().subscribe((formsData: FormsDataDto)=> {
          this.countries = formsData.countries;
          this.formats = formsData.formats;
          this.genres = formsData.genres;
        })
      }
    })
  }

  displayFn(artist: Artist): string {
    return artist && artist.name ? artist.name : '';
  }

  private _filter(name: string): Artist[] {
    const filterValue = name.toLowerCase();

    return this.artists.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
