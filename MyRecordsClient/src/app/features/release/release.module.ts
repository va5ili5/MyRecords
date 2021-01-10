import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesListComponent } from './releases-list/releases-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReleaseRoutingModule } from './release-routing.module';
import { ReleaseComponent } from './release/release.component';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [ReleasesListComponent, ReleaseComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReleaseRoutingModule
  ]
})
export class ReleaseModule { }
