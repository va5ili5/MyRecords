import { Component, Input, OnInit } from '@angular/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Country } from 'src/app/domain/country.model';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-countries-select',
  template: `
  <ng-select [items]="countries$ | async"
             bindLabel="name"
             [hideSelected]="true"
             [trackByFn]="trackByFn"
             [minTermLength]="2"
             [loading]="loading"
             typeToSearchText="Please enter 2 or more characters"
             [typeahead]="input$"
             [closeOnSelect]="true"
             [multiple]="false"
             [(ngModel)]="modelCountry">
    </ng-select>
  `
})
export class CountriesSelectComponent implements OnInit {
  @Input() modelCountry: Country;
  countries$: Observable<Country[]>;
  public input$ = new Subject<string | null>();
  loading = false;
  page:number = 0;
  perPage:number = 9;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  constructor(public countryService: CountryService) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  trackByFn(item: Country) {
    return item.id;
  }

  private loadCountries() {
    this.countries$ = concat(
        of([]), // default items
        this.input$.pipe(
            distinctUntilChanged(),
            tap(() => this.loading = true),
            switchMap(term => this.countryService.getCountries(term).pipe(
                catchError(() => of([])), // empty list on error
                tap(() => this.loading = false)
            ))
        )
    );
}

}
