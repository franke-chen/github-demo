import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { OrdersComponent } from './orders/orders.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  imports: [
    RouterModule.forChild([
    { path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
      { path: 'editor', component: EditorComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'password', component: ResetPasswordComponent },
      { path: 'orders', component: OrdersComponent },
      { path: '**', component: NotFoundComponent }
    ] },

    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
