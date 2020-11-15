import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReleasesListComponent } from './releases-list/releases-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ReleasesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseRoutingModule { }
