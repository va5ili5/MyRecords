import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesListComponent } from './releases-list/releases-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReleaseRoutingModule } from './release-routing.module';



@NgModule({
  declarations: [ReleasesListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReleaseRoutingModule
  ]
})
export class ReleaseModule { }
