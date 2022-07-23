import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, of, Subject } from 'rxjs';
import { TokenDto } from 'src/app/interfaces';
import { LoginService } from './login.service';
import { tap } from 'rxjs/operators';
import { environment, SNACKBAR_DURATION } from 'src/environments/environment';
import info from 'package.json';

export enum LoginStatus {
  error = 0,
  success = 1
}

export interface LoginResult {
  status: LoginStatus;
  message?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(
    private matSnackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private service: LoginService
    ) {

  }

  account = '';
  password = '';
  rememberme = true;

  loginChanged: Subject<LoginResult> = new Subject();

  serviceHealth = false;

  serviceStatus: 'signal_cellular_alt' | 'signal_cellular_connected_no_internet_4_bar' = 'signal_cellular_connected_no_internet_4_bar';

  private from = '';

  public title!: string;

  token?: TokenDto;

  ngOnInit(): void {

    document.title = 'Cloud77 Login';
    this.title = `Cloud77 Web (v${info.version})`;

    const fromQuery = this.route.snapshot.queryParamMap.get('from');
    if (fromQuery) {
      this.from = fromQuery;
    }

    fromEvent(document, 'keydown').subscribe((event: Event) => {
      const eventArgs = event as KeyboardEvent;
      if (!eventArgs) {
        return;
      }
      if (!eventArgs.key) {
        return;
      }
      const key = eventArgs.key.toLowerCase();
      if (key === 'enter') {
        this.login();
      }
    });

    this.loadData();

    this.loginChanged.subscribe(result => {
      this.onLoginChanged(result);
    });
  }

  onAccountChange(event: any): void {
    if (this.account.includes('@')) {
      this.service.loginPreCheck(this.account).then(res => {

        if (res && res.userId < 0) {
          this.loginChanged.next({
            status: LoginStatus.error,
            message: 'Not existing account'
          });
        }
      }, err => {
        this.loginChanged.next({
          status: LoginStatus.error,
          message: err.error.message
        });
      });

    }
    this.clone_test();
  }

  login(): void {

    if (!this.account) {
      return;
    }
    if (!this.password) {
      return;
    }

    this.service.getToken({
      email: this.account.includes('@') ? this.account.toLowerCase() : undefined,
      name: this.account.includes('@') ? undefined : this.account.toLowerCase(),
      password: this.password
    }).then(res => {
      // this.service.saveToken(res as TokenDto, this.rememberme);
      this.token = res as TokenDto;
      return Promise.resolve();
    }, err => {
      console.error(err);
      this.loginChanged.next({
        status: LoginStatus.error,
        message: err.error.message
      });

      return Promise.reject();
    }).then(() => {
      this.loginChanged.next({ status: LoginStatus.success });
    });
  }

  async loadData(): Promise<void> {
    await this.service.getServiceHealth().then(res => {
      console.log(res);
      this.serviceHealth = true;
    }, err => {
      console.error(err);
    }).finally(() => {
      this.serviceStatus = this.serviceHealth ? 'signal_cellular_alt' : 'signal_cellular_connected_no_internet_4_bar';
    });

    if (!this.serviceHealth) {
      this.loginChanged.next({
        status: LoginStatus.error,
        message: 'Fail to connect with service endpoint'
      });
    }

    const data = this.service.getAccountFromCache();
    if (data) {
      this.account = data;
    }

    of({ user: 'franke' }).pipe(
      tap(x => console.log(x.user))
    ).subscribe(res => {
      console.log(res.user);
    }, err => {
      console.log(err);
    }, () => {
      console.log('done');
    });
  }

  private clone_test(): void {
    const objectA = { foo: { bar: 'baz' }};

    const objectA1 = {...objectA};

    const objectA3 = Object.assign({}, objectA);

    const objectA2 = JSON.parse(JSON.stringify(objectA));

    const objectA4 = this.service.deepClone(objectA);

    console.log(objectA1.foo.bar);
    console.log(objectA3.foo.bar);
    console.log(objectA4.foo.bar);

    setTimeout(() => {
      objectA.foo.bar = 'abc';
      console.log(objectA1.foo.bar);
      console.log(objectA3.foo.bar);
      console.log(objectA4.foo.bar);
    }, 0);
  }

  onLoginChanged(event: LoginResult): void {
    if (event.status === LoginStatus.error) {
      this.matSnackbar.open('error', event.message , { duration: SNACKBAR_DURATION });
    } else {
      document.location.href = `${this.from}/login?access_token=${this.token?.access_token}&refresh_token=${this.token?.refresh_token}`;
      // switch (this.from) {
      //   case 'management-web':
      //     document.location.href = `${environment.management_web}/login?access_token=${this.token?.access_token}&refresh_token=${this.token?.refresh_token}`;
      //     break;
      //   case 'super-web':
      //     document.location.href = `${environment.super_web}/login?access_token=${this.token?.access_token}&refresh_token=${this.token?.refresh_token}`;
      //     break;
      //   default:
      //     sessionStorage.setItem('access_token', this.token?.access_token as string);
      //     sessionStorage.setItem('refresh_token', this.token?.refresh_token as string);

      //     setTimeout(() => {
      //       this.router.navigate(['/dashboard']);
      //     }, 0);
      //     break;
      // }
    }
  }
}
