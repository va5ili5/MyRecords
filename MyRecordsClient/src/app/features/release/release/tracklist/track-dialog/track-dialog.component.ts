import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-track-dialog',
  templateUrl: './track-dialog.component.html',
  styleUrls: ['./track-dialog.component.scss']
})
export class TrackDialogComponent implements OnInit {
  action:string;
  trackForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TrackDialogComponent>) { }

  ngOnInit(): void {
    this.action = 'Add';
    this.trackForm = this.formBuilder.group({
      position: ['', Validators.required],
      title: ['', Validators.required],
      length: ['', Validators.required]
    });

    if(this.data.track) {
      this.action = 'Update';
      this.trackForm.controls['position'].setValue(this.data.track.position);
      this.trackForm.controls['title'].setValue(this.data.track.title);
      this.trackForm.controls['length'].setValue(this.data.track.length);
    }
  }

  addTrack() {
    if(this.data.track) {
      let index = this.data.model.findIndex(item => item.position === this.data.track.position);
      //let index = this.data.model.indexOf(updateItem);
      this.data.model[index].position = +this.trackForm.controls['position'].value;
      this.data.model[index].title = this.trackForm.controls['title'].value;
      this.data.model[index].length = this.trackForm.controls['length'].value;
    } else {
      this.data.model.push({
        position: +this.trackForm.controls['position'].value,
        title: this.trackForm.controls['title'].value,
        length: this.trackForm.controls['length'].value,
        release_id: 1
      })
    }
    this.dialogRef.close();
  }

}
