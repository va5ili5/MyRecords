import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Format } from 'src/app/domain/format.model';
import { FormatService } from 'src/app/services/format.service';

@Component({
  selector: 'app-format-select',
  template: `
      <ng-select [items]="formats$ | async"
      bindLabel="name"
      bindValue="id"
      [closeOnSelect]="true"
      [hideSelected]="true"
      [multiple]="false"
      [typeahead]="input$"
      [(ngModel)]="modelFormat && modelFormat.id">
    </ng-select>
  `,
  styles: [
  ]
})
export class FormatSelectComponent implements OnInit {
  @Input() modelFormat: Format;
  formats$: Observable<Format[]>;
  public input$ = new Subject<string | null>();

  constructor(public formatService: FormatService) { }

  ngOnInit(): void {
    this.formats$ = this.formatService.getFormats();
  }

}
