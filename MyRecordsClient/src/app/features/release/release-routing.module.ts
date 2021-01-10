import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/guards/authentication.guard';
import { ReleaseComponent } from './release/release.component';
import { ReleasesListComponent } from './releases-list/releases-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ReleasesListComponent },
  { path: 'releases/create', pathMatch: 'full', component: ReleaseComponent, canActivate: [AuthGuard] },
  { path: 'releases/edit/:id', pathMatch: 'full', component: ReleaseComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ReleaseRoutingModule { }
