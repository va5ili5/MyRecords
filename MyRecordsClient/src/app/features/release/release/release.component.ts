import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips/chip-input';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { LabelService } from 'src/app/services/label.service';
import { Label } from 'src/app/domain/label.model';
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

  public artists: Artist[] = [];
  public labels: Label[] = [];
  public countries: Country[] = [];
  public formats: Format[] = [];
  public genres: Genre[] = [];

  
  artistCtrl = new FormControl();
  labelCtrl = new FormControl();
  formatCtrl = new FormControl();

  filteredArtists$: Observable<Artist[]>;
  filteredLabels$: Observable<Label[]>;
  releaseArtists: any[] = [];
  releaseLabel: Label = null;
  availableArtists: any[] = [];
  availableLabels: any[] = [];

  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('artistInput', {static: false}) artistInput: ElementRef<HTMLInputElement>;
  @ViewChild('artistAuto', {static: false}) matAutocomplete: MatAutocomplete;
  
  
  removable = true;
  constructor(public releaseService: ReleaseService, public formsDataService: FormsdataService, public route: ActivatedRoute, public artistService: ArtistService,
    public labelService: LabelService) { 
    this.labelService.getLabels().subscribe((labels: Label[]) => {
      this.availableLabels = labels;
    })
    this.artistService.getArtists().subscribe((artists: Artist[]) => {
      this.availableArtists = artists;

      this.filteredArtists$ = this.artistCtrl.valueChanges.pipe(
        startWith(null),
        map((artist: string | null) => this._filter(artist)));
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      this.formInit();
      if(paraMap.has('id')){
        this.mode = 'edit';
        this.releaseId = +paraMap.get('id');
        this.releaseService.getRelease(this.releaseId).subscribe((release: Release) => {
          this.release = release;
          this.releaseArtists = release.artists;
          this.releaseLabel = release.label;
        });
      } else {
        this.mode = 'create';
        
      }
    })
  }

  private formInit() {
    this.formsDataService.getFormsData().subscribe((formsData: FormsDataDto)=> {
      this.artists = formsData.artists;
      this.labels = formsData.labels;
      this.countries = formsData.countries;
      this.formats = formsData.formats;
      this.genres = formsData.genres;

      this.filteredLabels$ = this.labelCtrl.valueChanges.pipe(
        startWith(null),
        map((label: string | null) => this._labelfilter(label)));

      this.filteredArtists$ = this.artistCtrl.valueChanges.pipe(
        startWith(null),
        map((artist: string | null) => this._filter(artist)));

    });
  }

  artistSelected(event: MatAutocompleteSelectedEvent): void {
    const artist = event.option.value;
    if (this.releaseArtists.findIndex(o => o['name'] === artist['name']) === -1) {
      this.releaseArtists.push(artist);
      this.artistInput.nativeElement.value = '';
    this.artistCtrl.setValue(null);
    }

    // this.artists.push(event.option.value);
    // this.artistInput.nativeElement.value = '';
    // this.artistCtrl.setValue(null);
  }

  private _filter(name: any): Artist[] {
    if(typeof name === 'string' || name instanceof String) {
      return this.artists.filter(
        obj => obj['name'].toLowerCase().includes(name.toLowerCase()) && this.releaseArtists.findIndex(o => o['name'].toLowerCase() === obj['name'].toLowerCase()) === -1);
    }
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    //if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      const index = this.artists.findIndex(o => o['name'] === value)
      if (index !== -1) {
        this.releaseArtists.push(this.artists[index]);
        this.artistCtrl.setValue(null);
        input.value = '';
      } else {
        if (value !== '') {
          this.artistCtrl.setErrors({failed: true});
        }
      }
    //}
  }

  remove(artist: Artist): void {
    const index = this.releaseArtists.indexOf(artist);

    if (index >= 0) {
      this.releaseArtists.splice(index, 1);
    }
  }

  // LABEL
  private _labelfilter(name: any): Label[] {
    if(typeof name === 'string' || name instanceof String) {
      return this.availableLabels.filter(
        obj => obj['name'].toLowerCase().includes(name.toLowerCase()));
    }
  }
  
  displayFn(label?: Label): string | undefined {
    if (label) {
      return label.name;
    }
  }
  
}
