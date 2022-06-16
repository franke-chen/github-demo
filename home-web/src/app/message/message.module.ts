import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './message.component';
import { MessageRoutingModule } from './message.routing.module';

@NgModule({
  declarations: [
   MessageComponent
  ],
  imports: [
    MessageRoutingModule
  ],
  providers: [

  ],
  bootstrap: [MessageComponent]
})
export class MessageModule {
  constructor() {
    console.log('message module is loaded');
  }
}
