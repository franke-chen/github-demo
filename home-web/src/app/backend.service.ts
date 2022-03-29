import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APIKey, PreLogin } from './interface';
import * as clone from 'clone';
export interface Account {
  email: string;
  name: string;
  role: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    public client: HttpClient
  ) {
  }

  public LoginAPIEndpoint = '/' + 'login-api';

  public ClientAPIEndpoint = '/' + 'client-api';

  public deepClone<T>(value: T): T {
    return clone<T>(value);
  }

  public  getServiceHealth(): Promise<string> {
    return this.client.get(`${this.LoginAPIEndpoint}/health`, { responseType: 'text' }).toPromise<string>();
  }

  private getAPIKey(): Promise<APIKey> {

    if (sessionStorage.getItem('apikey')) {
      return of({ apikey: String(sessionStorage.getItem('apikey')) }).toPromise();
    } else {
      return this.client.get<APIKey>(`${this.LoginAPIEndpoint}/info/apikey`).pipe(
        tap(res => {
          sessionStorage.setItem('apikey', res.apikey);
        })
      ).toPromise();
    }
  }

  public clearLogin(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    const reme = sessionStorage.getItem('rememberme');
    if (!reme || reme !== 'true') {
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('name');
    }
  }

  private tokenCheck(): Promise<Account> {
    return this.client.get<Account>(`${this.LoginAPIEndpoint}/token/check`).toPromise();
  }

  async pageInitCheck(protect: boolean): Promise<Account | void> {

    return new Promise<Account | void>(async (resolve, reject) => {

      const key = await this.getAPIKey();
      console.log(key);

      if (!protect) {
        resolve(undefined);
      }
      else {
        const account = await this.tokenCheck();
        if (account) {
          resolve(account);
        } else {
          reject('Not Allowed');
        }
      }
    });
  }
}
