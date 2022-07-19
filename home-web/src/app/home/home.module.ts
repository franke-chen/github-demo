import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { Cloud77UIModule } from '@franke-chen/cloud77-ui-angular';
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
    Cloud77UIModule,
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
