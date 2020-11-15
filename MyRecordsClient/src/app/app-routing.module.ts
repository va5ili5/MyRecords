import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'release',
    loadChildren: () => import('./features/release/release.module').then(mod => mod.ReleaseModule)
  },
  {
    // lazy loading
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
