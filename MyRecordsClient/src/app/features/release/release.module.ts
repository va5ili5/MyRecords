import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesListComponent } from './releases-list/releases-list.component';



@NgModule({
  declarations: [ReleasesListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ReleasesListComponent
  ]
})
export class ReleaseModule { }
