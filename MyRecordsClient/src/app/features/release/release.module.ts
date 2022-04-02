import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesListComponent } from './releases-list/releases-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReleaseRoutingModule } from './release-routing.module';
import { ReleaseComponent } from './release/release.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TracklistComponent } from './release/tracklist/tracklist.component';
import { TrackDialogComponent } from './release/tracklist/track-dialog/track-dialog.component';
import { CountriesSelectComponent } from './release/select/countries-select.component';
import { FormatSelectComponent } from './release/select/format-select.component';
import { LabelSelectComponent } from './release/select/label-select.component';



@NgModule({
  declarations: [ReleasesListComponent, ReleaseComponent, TracklistComponent, TrackDialogComponent, CountriesSelectComponent, FormatSelectComponent, LabelSelectComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReleaseRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReleaseModule { }
