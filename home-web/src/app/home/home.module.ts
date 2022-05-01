import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { Cloud77AngularModule } from 'cloud77-angular';
import { BannerComponent } from './banner/banner.component';
import { HomeChildComponent, HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeChildComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    Cloud77AngularModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ])
  ],
  exports: [

  ],
  providers: [

  ]
})
export class HomeModule {
  constructor() {

  }
}
