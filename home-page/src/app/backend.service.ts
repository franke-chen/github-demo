import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from "rxjs/operators";
import { APIKey, PreLogin } from './interface';

export interface AccountData {
  email: string,
  name: string,
  rememberme: boolean
}

export interface TokenCheck {
  email: string,
  name: string,
  role: string,
  userId: number
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor (
    client: HttpClient
  ) {
    this._client = client;
  }

  public _client: HttpClient;

  public LoginAPIEndpoint = location.origin + "/" + "login-api";

  public ClientAPIEndpoint = location.origin + "/" + "client-api";

  public getAccountFromCache(): AccountData | undefined {
    const data: AccountData = {
      email: "",
      name: "",
      rememberme: false
    }
    if (sessionStorage.getItem("name")) {
      data.name = String(sessionStorage.getItem("name"));
    } else {
      return;
    }

    if (sessionStorage.getItem("email")) {
      data.email = String(sessionStorage.getItem("email"));
    } else {
      return;
    }

    const reme = sessionStorage.getItem("rememberme");
    if (reme && reme === "true") {
      data.rememberme = true;
    }
    return data;
  }

  public clearLogin(): void {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    const reme = sessionStorage.getItem("rememberme");
    if (!reme || reme !== "true") {
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("name");
    }
  }

  public  callHealth(): Promise<string> {
    return this._client.get(`${this.LoginAPIEndpoint}/health`, { responseType: "text" }).toPromise<string>();
  }

  public getProducts(): Promise<any> {
    return this._client.get(`${this.LoginAPIEndpoint}/products`).toPromise();
  }

  public getAPIKey(): Promise<APIKey> {
    if (sessionStorage.getItem("apikey")) {
      return of({ apikey: String(sessionStorage.getItem("apikey")) }).toPromise();
    } else {
      return this._client.get<APIKey>(`${this.LoginAPIEndpoint}/info/apikey`).pipe(
        tap(res => {
          sessionStorage.setItem("apikey", res.apikey);
        })
      ).toPromise();
    }
  }

  public tokenCheck(): Promise<TokenCheck> {
    return this._client.get<TokenCheck>(`${this.LoginAPIEndpoint}/token/check`).toPromise();
  }

  public loginPreCheck(email: string): Promise<PreLogin> {
    const params = new HttpParams().set("email", email);
    return this._client.get<PreLogin>(`${this.LoginAPIEndpoint}/prelogins`, { params: params }).toPromise();
  }

  public getTodos(): Promise<object> {
    return this._client.get("https://jsonplaceholder.typicode.com/todos/1").pipe(
      tap(res => console.log(res))
    ).toPromise();
  }

  // async Get11AllSalesMenAsync(): Promise<SalesMan[]> {
  //   const url = `${APIPrefix}${'/salesmen'}`
  //   return await this.client.get<SalesMan[]>(url, { observe: "body", responseType: "json" }).toPromise()
  // }

  // async Get11SalesMenAsync (domain: string, region: string): Promise<SalesMan[]> {
  //   const url = `${APIPrefix}${'/salesmen'}`
  //   const params = new HttpParams().set('domain', domain).set('country', region)
  //   return await this.client.get<SalesMan[]>(url, { params: params, observe: "body", responseType: "json" }).toPromise()
  // }
}
