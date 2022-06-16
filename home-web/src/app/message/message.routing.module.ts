import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './message.component';


@NgModule({
  imports: [
    RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: MessageComponent
    }
    ])
  ],
  exports: [RouterModule]
})
export class MessageRoutingModule {}
