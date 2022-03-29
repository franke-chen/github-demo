import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  imports: [
    RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: PasswordComponent
    }, {
      path: '**', component: NotFoundComponent
    }
    ])
  ],
  exports: [RouterModule]
})
export class ForgetPasswordRoutingModule {}
