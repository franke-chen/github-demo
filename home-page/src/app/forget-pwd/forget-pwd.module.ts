import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCommonModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ForgetPasswordRoutingModule } from "./forget-pwd.routing.module";
import { PasswordComponent } from "./password/password.component";

@NgModule({
  declarations: [
    PasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCommonModule,
    MatToolbarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ForgetPasswordRoutingModule
  ],
  providers: [

  ]
})
export class ForgetPasswordModule {
  constructor() {

  }
}
