import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: SignupComponent
    }, {
      path: '**', component: NotFoundComponent
    }
    ])
  ],
  exports: [RouterModule]
})
export class SignUpRoutingModule {}
