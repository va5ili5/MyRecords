import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Artist } from 'src/app/domain/artist.model';
import { Country } from 'src/app/domain/country.model';
import { Format } from 'src/app/domain/format.model';
import { Genre } from 'src/app/domain/genre.model';
import { Label } from 'src/app/domain/label.model';
import { Release } from 'src/app/domain/release.model';
import { Song } from 'src/app/domain/song.model';
import { FormsDataDto } from 'src/app/dto/forms-data-dto';
import { FormatService } from 'src/app/services/format.service';
import { FormsdataService } from 'src/app/services/formsdata.service';
import { ReleaseService } from 'src/app/services/release.service';
import { ArtistModule } from '../../artist/artist.module';


@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {
  panelOpenState = false;
  private mode = 'create';
  private releaseId: number;
  public release: Release;

  public format: any;
  public country: any;
  public releaseDate: any;

  //public artists: Artist[] = [];
  public releaseArtists: Artist[];


  public labels: Label[] = [];


  public genres: Genre[] = [];

  labelCtrl = new UntypedFormControl();


  genreCtrl = new UntypedFormControl();

  filteredArtists$: Observable<Artist[]>;
  filteredLabels$: Observable<Label[]>;

  formats$: Observable<Format[]>;
  selectedFormatId:number;

  tracklist:Song[];

  public input$ = new Subject<string | null>();

  public selectedLabelId: number = null;


  constructor(public releaseService: ReleaseService, public formsDataService: FormsdataService, public route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      //this.formInit();
      if(paraMap.has('id')){
        this.mode = 'edit';
        this.releaseId = +paraMap.get('id');
        this.releaseService.getRelease(this.releaseId).subscribe((release: Release) => {
          this.release = release;
          this.selectedLabelId = release.label.id;
          this.selectedFormatId = release.format.id;
          //this.country = release.country;
          this.releaseDate = release.releaseDate;
          this.tracklist = release.songs;

        });
      } else {
        this.mode = 'create';
      }
    })
  }

  displayFn(label?: Label): string | undefined {
    if (label) {
      return label.name;
    }
  }

  public compareFn = function( option, value ) : boolean {
    if(option != null && value != null)
    return option.id === value.id;
  }

}
