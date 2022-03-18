import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

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
      alert("save new password");
    }
  }
}
