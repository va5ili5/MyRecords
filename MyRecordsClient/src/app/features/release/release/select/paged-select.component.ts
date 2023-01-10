import { HttpClient } from '@angular/common/http';
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
  BehaviorSubject,
  combineLatest,
  concat,
  Observable,
  of,
  pipe,
  Subject,
} from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  finalize,
  map,
  mergeMap,
  scan,
  startWith,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs/operators';
import { Base } from 'src/app/domain/base.model';
import { PagedService } from 'src/app/services/paged.service';

@Component({
  selector: 'app-paged-select',
  template: `
    <ng-select
      [items]="items$ | async"
      [bindLabel]="bindLabel"
      [hideSelected]="true"
      [trackByFn]="trackByFn"
      [loading]="loading"
      [typeahead]="input$"
      [closeOnSelect]="true"
      [multiple]="multiple"
      [(ngModel)]="model"
      [virtualScroll]="true"
      (scrollToEnd)="onScrollToEnd()"
      #select
    >
    </ng-select>
  `
})
export class PagedSelectComponent implements OnInit {
  @Input() model: any;
  @Input() bindLabel: string;
  @Input() serviceName: string;
  @Input() multiple: boolean
  items$: Observable<Base[]>;
  next$ = new Subject<any>();
  input$ = new Subject<string | null>();
  loading = false;

  @ViewChild('select') select: NgSelectComponent;
  constructor(protected pagedService: PagedService<Base>) { }

  ngOnInit(): void {
    this.loadItems();
  }

  onScrollToEnd() {
    this.next$.next();
  }

  trackByFn(item: Base) {
    return item.id;
  }

  private loadItems() {
    this.items$ = concat(
      of([]), // default items
      this.input$.pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term) => {
          let page = 1;
          if (this.select && this.select.dropdownPanel) {
            this.select.dropdownPanel.scrollElementRef.nativeElement.scrollTop = 0;
          }
          return this.next$.pipe(
            tap(() => (this.loading = true)),
            startWith(page),
            exhaustMap((_) => this.pagedService.getAll(this.serviceName, term, page)),
            tap(() => page++),
            takeWhile((p: any) => p.length > 0, true),
            scan((acc, value) => [...acc, ...value]),
            catchError(() => of([])),
            tap(() => (this.loading = false))
          );
        })
      )
    );
  }
}
