import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, concat, Observable, of, Subject } from 'rxjs';
import { catchError, concatMap, debounceTime, distinctUntilChanged, map, mergeMap, scan, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
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
             (scrollToEnd)="onScrollToEnd()">
    </ng-select>
  `
})
export class CountriesSelectComponent implements OnInit {
  @Input() modelCountry: Country;
  countries$: Observable<Country[]>;
  public input$ = new Subject<string | null>();
  loading = false;
  page: number = 1;
  perPage: number = 9;

  pageNumberSubject = new BehaviorSubject<number>(1);
  pageNumberAction$ = this.pageNumberSubject.asObservable();
  
  constructor(public countryService: CountryService) { }

  ngOnInit(): void {
    this.loadCountries()
  }

  onScrollToEnd() {
    this.pageNumberSubject.next(this.pageNumberSubject.value + 1);
  }


  trackByFn(item: Country) {
    return item.id;
  }

  private loadCountries() {
    this.countries$ = concat(
      of([]), // default items
      this.input$.pipe(
        tap(() => this.pageNumberSubject.unsubscribe),
        debounceTime(800),
        distinctUntilChanged(),
        switchMap((term) => this.pageNumberAction$.pipe(
          tap(() => this.loading = true),
          concatMap((page) => 
              this.countryService.getCountries(term, page)),
          scan((acc, value) => [...acc, ...value]),
          catchError(() => of([])), // empty list on error
          tap(() => this.loading = false)
        ))
      )
    );
  }
}
