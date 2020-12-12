import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesListComponent } from './releases-list/releases-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReleaseRoutingModule } from './release-routing.module';
import { ReleaseComponent } from './release/release.component';



@NgModule({
  declarations: [ReleasesListComponent, ReleaseComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReleaseRoutingModule
  ]
})
export class ReleaseModule { }
