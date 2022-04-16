import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreLogin, TokenDto } from 'src/app/interface';
import { BackendService } from '../../backend.service';

@Injectable()
export class LoginService extends BackendService {

  public getAccountFromCache(): string | undefined {
    const email = localStorage.getItem('email');
    if (email) {
      return String(email);
    } else {
      return;
    }
  }

  public getToken(user: { email?: string, name?: string, password: string }): Promise<any> {
    return this.getLoginToken(user);
  }

  public StartAuth(user: { email?: string, name?: string, password: string }): Promise<any> {
    return this.getLoginToken({ email: user.email, name: user.name, password: user.password });
   }

  public StartAuthSlient(): Promise<any> {
    return this.getLoginToken({ name: localStorage.getItem('name'), token: localStorage.getItem('refresh_token') });
  }

  private getLoginToken(user: {
    email?: string | null,
    name?: string | null,
    password?: string | null,
    token?: string | null
  }): Promise<any> {

    let params = new HttpParams();
    if (user.email && user.email !== '') {
      params = params.set('email', user.email.toLowerCase());
    }
    if (user.name && user.name !== '') {
      params = params.set('username', user.name.toLowerCase());
    }
    if (user.password && user.password !== '') {
      params = params.set('password', user.password);
    }
    if (user.token && user.token !== '') {
      params = params.set('refresh_token', user.token);
    }

    return this.client.get(`${this.LoginAPIEndpoint}/token`, { params }).toPromise();
   }

  public saveToken(token: TokenDto, reme: boolean = false): void {
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);

    if (reme) {
      localStorage.setItem('name', token.user);
      localStorage.setItem('email', token.email);
     } else {
       localStorage.removeItem('name');
       localStorage.removeItem('email');
     }
  }

  public GetResetToken(email: string): Promise<any> {
    return this.client.get(`${this.LoginAPIEndpoint}/passwords/tokens?email=${email}`).toPromise();
  }

  public loginPreCheck(email: string): Promise<PreLogin> {
    const params = new HttpParams().set('email', email);
    return this.client.get<PreLogin>(`${this.LoginAPIEndpoint}/prelogins`, { params }).toPromise();
  }
}
