import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReleaseComponent } from './release/release.component';
import { ReleasesListComponent } from './releases-list/releases-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ReleasesListComponent },
  { path: 'releases/create', pathMatch: 'full', component: ReleaseComponent },
  { path: 'releases/edit/:id', pathMatch: 'full', component: ReleaseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseRoutingModule { }
