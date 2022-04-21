import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MyLibModule } from 'my-lib';
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
    MyLibModule,
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
