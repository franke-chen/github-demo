import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { LoginService, TokenDto } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(
    private service: LoginService,
    private matSnackbar: MatSnackBar,
    private router: Router) { }

  account: string = "";
  password: string = "";

  ngOnInit(): void {
    fromEvent(document, "keydown").subscribe((event: Event) => {
      const eventArgs = event as KeyboardEvent;
      if (!eventArgs) return;
      if (!eventArgs.key) return;
      const key = eventArgs.key.toLowerCase();
      if (key === "enter") {
        this.login();
      }
    })

    this.service.getAPIKey().then(res => {
      console.log(res);
    })
    this.service.getProducts().then(res => {
      console.log(res);
    })

    document.title = "Cloud77 Login";
  }

  onAccountChange(event: any): void {
   if (this.account.includes("@")) {
    this.service.loginPreCheck(this.account).then(res => {
      if (res.userId < 0) {
        this.matSnackbar.open("Error", "Not existing account", { duration: 3000 });
      }
    }, err => {
      this.matSnackbar.open("Error", err.error.message, { duration: 3000 });
    });
    }
  }

  login(): void {

    if (!this.account) return;
    if (!this.password) return;

    this.service.getToken({
      email: this.account.includes("@") ? this.account.toLowerCase() : undefined,
      name: this.account.includes("@") ? undefined : this.account.toLowerCase(),
      password: this.password
    }).then(res => {
      this.service.saveTokenInCache(res as TokenDto);
      return Promise.resolve();
    }, err => {
      console.error(err);
      this.matSnackbar.open("error", err.error.message, { duration: 1000 });
      return Promise.reject();
    }).then(res => {
      this.router.navigate(["/dashboard"]);
    })
  }
}
