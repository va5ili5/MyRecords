import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Label } from 'src/app/domain/label.model';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-label-select',
  template: `
    <ng-select [items]="labels$ | async"
    bindLabel="name"
    bindValue="id"
    [closeOnSelect]="true"
    [hideSelected]="true"
    [multiple]="false"
    [typeahead]="input$"
    [(ngModel)]="modelLabel && modelLabel.id">
  </ng-select>
  `,
  styles: [
  ]
})
export class LabelSelectComponent implements OnInit {
  @Input() modelLabel: Label;
  labels$: Observable<Label[]>;
  public input$ = new Subject<string | null>();

  constructor(public labelService: LabelService) { }

  ngOnInit(): void {
    this.labels$ = this.labelService.getLabels();
  }

}
