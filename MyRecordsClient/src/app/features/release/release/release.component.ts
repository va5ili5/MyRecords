import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Release } from 'src/app/domain/release.model';
import { ReleaseService } from 'src/app/services/release.service';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {

  private mode = 'create';
  private releaseId: number;
  private release: Release;
  constructor(public releaseService: ReleaseService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if(paraMap.has('releaseId')){
        this.mode = 'edit';
        this.releaseId = +paraMap.get('releaseId');
        this.releaseService.getReleases().subscribe((releases: Release[]) => {
          this.release = releases.find(rel => rel.id === this.releaseId);
        })
      } else {
        this.mode = 'create';
        this.releaseId = null;
      }
    })
  }

}
