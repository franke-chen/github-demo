import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TutorialComponent } from './tutorial.component';


@NgModule({
  imports: [
    RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: TutorialComponent
    }
    ])
  ],
  exports: [RouterModule]
})
export class TutorialRoutingModule {}
