import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  }

  currentPasswordIsCorrect(): boolean {
    return true;
  }

  newPasswordIsValid(): boolean {
    return true;
  }

  saveNewPassword(): void {
    if (this.currentPasswordIsCorrect() && this.newPasswordIsValid()) {
      this.service.updatePassword().then(() => {
        this.snackbar.open("Info", "Password is updated, please login again.", { duration: 2000 })
        this.service.clearLogin();
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 2100);
      }, err => {
        console.log(err);
        this.snackbar.open("Error", err.error.message, { duration: 3000 })
      })
    }
  }
}
