import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { NgSelectComponent } from '@ng-select/ng-select';
import { BehaviorSubject, combineLatest, concat, Observable, of, pipe, Subject } from 'rxjs';
import { catchError, concatMap, debounceTime, distinctUntilChanged, exhaustMap, finalize, map, mergeMap, scan, startWith, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { Country } from 'src/app/domain/country.model';
import { CountryService } from 'src/app/services/country.service';
@Component({
  selector: 'app-countries-select',
  template: `
  <ng-select [items]="countries$ | async"
             bindLabel="name"
             [hideSelected]="true"
             [trackByFn]="trackByFn"
             [loading]="loading"
             [typeahead]="input$"
             [closeOnSelect]="true"
             [multiple]="false"
             [(ngModel)]="modelCountry"
             [virtualScroll]="true"
             (scrollToEnd)="onScrollToEnd()"
             #select>
    </ng-select>
  `
})
export class CountriesSelectComponent implements OnInit {
  @Input() modelCountry: Country;
  countries$: Observable<Country[]>;
  next$ = new Subject<any>();
  input$ = new Subject<string | null>();
  loading = false;
  @ViewChild('select') select: NgSelectComponent;

  constructor(public countryService: CountryService) { }

  ngOnInit() {
    this.loadCountries()
  }

  onScrollToEnd() {
    this.next$.next();
  }


  trackByFn(item: Country) {
    return item.id;
  }

  private loadCountries() {
    this.countries$ = concat(
      of([]), // default items
      this.input$.pipe(
      startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => {
          let page = 1;
          if(this.select && this.select.dropdownPanel) {
            this.select.dropdownPanel.scrollElementRef.nativeElement.scrollTop = 0;
          }
          return this.next$.pipe(
            tap(() => this.loading = true),
            startWith(page),
            exhaustMap(_ => this.countryService.getCountries(term, page)),
            tap(() => page++),
            takeWhile((p: any) => p.length > 0, true),
            scan((acc, value) => [...acc, ...value]),
            catchError(() => of([])),
            tap(() => this.loading = false)
          );
        })
      )
    );
  }
}
