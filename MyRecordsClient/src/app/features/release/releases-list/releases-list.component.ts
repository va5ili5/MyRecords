import { Component, OnInit } from '@angular/core';
import { Release } from 'src/app/domain/release.model';
import { ReleaseService } from 'src/app/services/release.service';

@Component({
  selector: 'app-releases-list',
  templateUrl: './releases-list.component.html',
  styleUrls: ['./releases-list.component.scss']
})
export class ReleasesListComponent implements OnInit {
  releases: Release[] = [];
  constructor(public releaseService: ReleaseService) { }

  ngOnInit(): void {
    this.releaseService.getReleases().subscribe((releases: Release[]) => {
      this.releases = releases;
    })
  }

}
