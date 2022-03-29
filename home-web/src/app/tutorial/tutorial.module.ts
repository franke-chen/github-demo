import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TutorialRoutingModule } from './tutorial.routing.module';
import { TutorialComponent } from './tutorial/tutorial.component';

@NgModule({
  declarations: [
   TutorialComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    TutorialRoutingModule
  ],
  providers: [

  ]
})
export class TutorialModule {
  constructor() {
    console.log('tutorial module is loaded');
  }
}
