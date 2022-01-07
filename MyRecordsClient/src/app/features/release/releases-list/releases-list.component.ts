import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Release } from 'src/app/domain/release.model';
import { ReleaseService } from 'src/app/services/release.service';

@Component({
  selector: 'app-releases-list',
  templateUrl: './releases-list.component.html',
  styleUrls: ['./releases-list.component.scss']
})
export class ReleasesListComponent implements OnInit {
  releases$: Observable<Release[]>;
  constructor(public releaseService: ReleaseService) { }

  ngOnInit(): void {
      this.releases$ = this.releaseService.getReleases();
  }

}
