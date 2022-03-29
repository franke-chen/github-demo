import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: LoginComponent
    }, {
      path: '**', component: NotFoundComponent
    }
    ])
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
