import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fromEvent, of } from 'rxjs';
import { TokenDto } from 'src/app/interface';
import { LoginService } from './login.service';
import { version } from "package.json";
import { tap } from 'rxjs/operators';
import { SNACKBAR_DURATION } from 'src/environments/environment';

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
  rememberme: boolean = true;

  title: string = "";

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

    this.title = `Cloud77 Web (v${version})`;
    document.title = "Cloud77 Login";

    this.loadData();
  }

  onAccountChange(event: any): void {
   if (this.account.includes("@")) {
    this.service.loginPreCheck(this.account).then(res => {
      if (res.userId < 0) {
        this.matSnackbar.open("Error", "Not existing account", { duration: SNACKBAR_DURATION });
      }
    }, err => {
      this.matSnackbar.open("Error", err.error.message, { duration: SNACKBAR_DURATION });
    });
    }

    this.clone_test();
  }

  login(): void {

    if (!this.account) return;
    if (!this.password) return;

    this.service.getToken({
      email: this.account.includes("@") ? this.account.toLowerCase() : undefined,
      name: this.account.includes("@") ? undefined : this.account.toLowerCase(),
      password: this.password
    }).then(res => {
      this.service.saveToken(res as TokenDto, this.rememberme);
      return Promise.resolve();
    }, err => {
      console.error(err);
      this.matSnackbar.open("error", err.error.message, { duration: SNACKBAR_DURATION });
      return Promise.reject();
    }).then(res => {
      this.router.navigate(["/dashboard"]);
    });
  }

  async loadData() {
    await this.service.getServiceHealth().then(res => {
      console.log(res);
    }, err => {
      console.error(err);
      this.matSnackbar.open("Error", "Fail to connect with service endpoint", { duration: SNACKBAR_DURATION })
    });

    await this.service.pageInitCheck(false).then(
      undefined, err => {
      console.log(err);
      this.matSnackbar.open("Error", "Fail to connect with service endpoint", { duration: SNACKBAR_DURATION })
    })

    const data = this.service.getAccountFromCache();
    if (data && data.account) {
      this.account = data.account;
      this.rememberme = data.rememberme;
    }

    of({ user: "franke" }).pipe(tap(x => console.log(x.user))).subscribe(res => {
      console.log(res.user);
    }, err => {
      console.log(err);
    }, () => {
      console.log("done");
    });
  }

  private clone_test(): void {
    const objectA = { foo: { bar: "baz" }};

    const objectA1 = {...objectA};

    const objectA3 = Object.assign({}, objectA);

    const objectA2 = JSON.parse(JSON.stringify(objectA));

    const objectA4 = this.service.deepClone(objectA);

    console.log(objectA1.foo.bar);
    console.log(objectA3.foo.bar);
    console.log(objectA4.foo.bar);

    setTimeout(() => {
      objectA.foo.bar = "abc";
      console.log(objectA1.foo.bar);
      console.log(objectA3.foo.bar);
      console.log(objectA4.foo.bar);
    }, 0);
  }
}
