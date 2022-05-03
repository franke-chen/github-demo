import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APIKey } from '../interfaces';
import * as clone from 'clone';

export interface Account {
  email: string;
  name: string;
  role: string;
  userId: number;
}

@Injectable()
export class AppCommonService {

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

  private isValid = false;

  public get tokenIsValid(): boolean {
    return this.isValid;
  }

  public getAPIKey(): Promise<APIKey> {
    const apiKey = sessionStorage.getItem('apikey');
    if (apiKey) {
      return of({ apikey: String(apiKey) }).toPromise();
    } else {
      return this.client.get<APIKey>(`${this.LoginAPIEndpoint}/apikey`).pipe(
        tap(res => {
          sessionStorage.setItem('apikey', res.apikey);
        })
      ).toPromise();
    }
  }

  async tokenCheck(): Promise<Account | void> {

    return new Promise<Account | void>(async (resolve, reject) => {
      const account = await this.client.get<Account>(`${this.LoginAPIEndpoint}/token/check`).toPromise();
      if (account) {
        this.isValid = true;
        resolve(account);
      } else {
        reject('Not Allowed');
      }
    });
  }
}
