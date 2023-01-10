import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, exhaustMap, scan, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';
import { Label } from 'src/app/domain/label.model';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-label-select',
  template: `
    <ng-select [items]="labels$ | async"
    bindLabel="name"
    [hideSelected]="true"
    [trackByFn]="trackByFn"
    [loading]="loading"
    [typeahead]="input$"
    [closeOnSelect]="true"
    [multiple]="false"
    [(ngModel)]="modelLabel"
    [virtualScroll]="true"
    (scrollToEnd)="onScrollToEnd()"
    #select>
  </ng-select>
  `,
  styles: [
  ]
})
export class LabelSelectComponent implements OnInit {
  @Input() modelLabel: Label;
  labels$: Observable<Label[]>;
  next$ = new Subject<any>();
  input$ = new Subject<string | null>();
  loading = false;
  @ViewChild('select') select: NgSelectComponent;

  constructor(public labelService: LabelService) { }

  ngOnInit(): void {
    this.loadLabels();
  }

  trackByFn(label: Label) {
    return label.id;
  }

  onScrollToEnd() {
    this.next$.next();
  }

  private loadLabels() {
    this.labels$ = concat(
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
            exhaustMap(_ => this.labelService.getLabels(term, page)),
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
