import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCommonModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignUpRoutingModule } from './signup.routing.module';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    SignupComponent
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
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
    MatButtonModule,
    SignUpRoutingModule
  ],
  providers: [

  ]
})
export class SignUpModule {
  constructor() {

  }
}
