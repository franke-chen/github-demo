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

  email = '';
  password = '';
  passwordNew = '';
  passwordNewAgain = '';

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private service: ResetPasswordService) { }

  ngOnInit(): void {
    this.service.tokenCheck().then(account => {
      if (account) {
        this.email = account.email;
      }
    }, err => {
      console.error(err);
      this.router.navigate(['/login']);
    });
  }

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
        // this.snackbar.open('Info', 'Password is updated, please login again.', { duration: SNACKBAR_DURATION })
        sessionStorage.clear();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      }, err => {
        console.log(err);
        this.snackbar.open('Error', err.error.message, { duration: SNACKBAR_DURATION });
      });
    }
  }
}
