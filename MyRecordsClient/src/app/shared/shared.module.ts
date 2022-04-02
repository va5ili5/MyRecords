import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    NgSelectModule
  ],
  exports:[
    MaterialModule,
    NgSelectModule
  ]
})
export class SharedModule { }
