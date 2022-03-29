import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SNACKBAR_DURATION } from 'src/environments/environment';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [ResetPasswordService]
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private service: ResetPasswordService) { }

  ngOnInit(): void {
    this.service.pageInitCheck(true).then(account => {
      console.log("page can init");
      console.log(account);
      if (account) {
        this.email = account.email;
      }
    }, err => {
      console.error(err);
      console.log("page can not init");
      this.router.navigate(["/login"]);
    });
  }

  email: string = "";
  password: string = "";
  passwordNew: string = "";
  passwordNewAgain: string = "";

  currentPasswordIsCorrect(): boolean {
    return true;
  }

  newPasswordIsValid(): boolean {
    return true;
  }

  saveNewPassword(): void {
    if (this.currentPasswordIsCorrect() && this.newPasswordIsValid()) {
      this.service.updatePassword({
        email: this.email,
        password: this.password,
        newPassword: this.passwordNew
      }).then(() => {
        // this.snackbar.open("Info", "Password is updated, please login again.", { duration: SNACKBAR_DURATION })
        this.service.clearLogin();
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 1000);
      }, err => {
        console.log(err);
        this.snackbar.open("Error", err.error.message, { duration: SNACKBAR_DURATION })
      })
    }
  }
}
