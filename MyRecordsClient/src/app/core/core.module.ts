import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReleaseModule } from '../features/release/release.module';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainComponent],
  imports: [
    ReleaseModule,
    CommonModule,
    MatToolbarModule
  ],
  exports: [
    MainComponent
  ]
})
export class CoreModule { }
