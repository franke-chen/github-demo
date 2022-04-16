import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APIKey } from './interface';
import * as clone from 'clone';

export interface Account {
  email: string;
  name: string;
  role: string;
  userId: number;
}

@Injectable()
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

  public getAPIKey(): Promise<APIKey> {
    const apiKey = localStorage.getItem('apikey');
    if (apiKey) {
      return of({ apikey: String(apiKey) }).toPromise();
    } else {
      return this.client.get<APIKey>(`${this.LoginAPIEndpoint}/info/apikey`).pipe(
        tap(res => {
          localStorage.setItem('apikey', res.apikey);
        })
      ).toPromise();
    }
  }

  async tokenCheck(): Promise<Account | void> {

    return new Promise<Account | void>(async (resolve, reject) => {
      const account = await this.client.get<Account>(`${this.LoginAPIEndpoint}/token/check`).toPromise();
      if (account) {
        resolve(account);
      } else {
        reject('Not Allowed');
      }
    });
  }
}
