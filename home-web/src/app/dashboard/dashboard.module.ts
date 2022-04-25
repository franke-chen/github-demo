import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { AccountComponent } from './account/account.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [
    AccountComponent,
    EditorComponent,
    OrdersComponent,
    ProfileComponent,
    ResetPasswordComponent,
    SettingComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCommonModule,
    MatToolbarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    MatSnackBarModule,
    CodemirrorModule,
    DashboardRoutingModule,
    HttpClientModule
  ],
  providers: [

  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule {
  constructor() {

  }
}
