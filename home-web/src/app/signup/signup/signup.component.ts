import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SNACKBAR_DURATION } from 'src/environments/environment.share';
import { SignUpService } from './signup.service';
import info from 'package.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignUpService]
})
export class SignupComponent implements OnInit {

  isLinear = true;
  title = '';
  email = '';
  name = '';
  password = '';
  passwordAgain = '';
  token = '';
  success = false;

  constructor(private service: SignUpService, private snackbar: MatSnackBar, private router: Router) {

  }

  ngOnInit(): void {
    document.title = 'Cloud77 Sign Up';
    this.title = `Cloud77 Web (v${info.version})`;
  }

  sendEmailToken(): void {
    this.service.getEmailToken(this.email);

    this.snackbar.open('Info', 'Comfirmation email is sent to you, check that.', { duration: SNACKBAR_DURATION });
  }

  postAccount(): void {
    this.service.postAccount({
      token: this.token,
      email: this.email,
      name: this.name,
      password: this.password
    }).then(() => {
      this.snackbar.open('Info', 'Your account is created.', { duration: SNACKBAR_DURATION });
      this.success = true;
    }, err => {
      console.log(err);
    });
  }

  goToLogin(): void {

  }
}
