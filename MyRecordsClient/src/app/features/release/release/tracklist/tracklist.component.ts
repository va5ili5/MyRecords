import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Song } from 'src/app/domain/song.model';
import { TrackDialogComponent } from './track-dialog/track-dialog.component';

@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss']
})
export class TracklistComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable, { static: false }) table: MatTable<any>
  displayedColumns: string[] = ['position', 'title', 'length', 'action'];
  @Input() dataSource: Song[];
  constructor(public dialog: MatDialog, public cdRef: ChangeDetectorRef ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  addTrackDialog() {
    this.dialog.open(TrackDialogComponent, {
      data: {
        model: this.dataSource
      }
    }).afterClosed().subscribe(() => {
      this.table.renderRows()
    })
  }

  editTrackDialog(track: any) {
    this.dialog.open(TrackDialogComponent, {
      data: {
        track: track,
        model: this.dataSource
      }
    }).afterClosed().subscribe(() => {
      this.table.renderRows()
    })
  }

  deleteTrack(track: any): void {
    const index = this.dataSource.findIndex(item => item.position === track.position);
    this.dataSource.splice(index, 1);
    this.table.renderRows();
  }

}
