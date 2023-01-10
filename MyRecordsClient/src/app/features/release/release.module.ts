import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesListComponent } from './releases-list/releases-list.component';
//import { SharedModule } from 'src/app/shared/shared.module';
import { ReleaseRoutingModule } from './release-routing.module';
import { ReleaseComponent } from './release/release.component';
//import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TracklistComponent } from './release/tracklist/tracklist.component';
import { TrackDialogComponent } from './release/tracklist/track-dialog/track-dialog.component';
import { CountriesSelectComponent } from './release/select/countries-select.component';
import { FormatSelectComponent } from './release/select/format-select.component';
import { LabelSelectComponent } from './release/select/label-select.component';
import { PagedSelectComponent } from './release/select/paged-select.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [ReleasesListComponent, ReleaseComponent, TracklistComponent, TrackDialogComponent, CountriesSelectComponent, FormatSelectComponent, LabelSelectComponent, PagedSelectComponent],
  imports: [
    CommonModule,
    //SharedModule,
    //MaterialModule,
    ReleaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ReleaseModule { }
