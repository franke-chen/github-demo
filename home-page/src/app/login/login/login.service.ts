import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendService } from "../../backend.service";

export interface TokenDto {
  email: string,
  user: string,
  role: string
  access_token: string,
  refresh_token: string,
}

export interface PreLogin {
  email: string,
  hasPassword: boolean,
  isAuthenticated: boolean,
  userId: number
}

@Injectable()
export class LoginService extends BackendService {

  getAPIKey(): Promise<any> {
    return this._client.get(`${this.LoginAPIEndpoint}/info/apikey`).toPromise();
  }

  getProducts(): Promise<any> {
    return this._client.get(`${this.LoginAPIEndpoint}/products`).toPromise();
  }

  loginPreCheck(email: string): Promise<PreLogin> {
    const params = new HttpParams().set("email", email);
    return this._client.get<PreLogin>(`${this.LoginAPIEndpoint}/prelogins`, { params: params }).toPromise();
  }

  getToken(user: { email?: string, name?: string, password: string }): Promise<any> {
    return this.getLoginToken(user);
  }

  StartAuth(user: { email?: string, name?: string, password: string }): Promise<any> {
    return this.getLoginToken({ email: user.email, name: user.name, password: user.password });
   }

   StartAuthSlient(): Promise<any> {
    return this.getLoginToken({ name: sessionStorage.getItem("name"), token: sessionStorage.getItem("refresh_token") });
   }

   private getLoginToken(user: {
    email?: string | null,
    name?: string | null,
    password?: string | null,
    token?: string | null
   }): Promise<any> {

    let params = new HttpParams();
    if (user.email && user.email !== "") {
      params = params.set("email", user.email.toLowerCase());
    }
    if (user.name && user.name !== "") {
      params = params.set("username", user.name.toLowerCase());
    }
    if (user.password && user.password !== "") {
      params = params.set("password", user.password);
    }
    if (user.token && user.token !== "") {
      params = params.set("refresh_token", user.token);
    }

     return this._client.get(`${this.LoginAPIEndpoint}/token`, { params: params }).toPromise();
   }

   public saveTokenInCache(token: TokenDto): void {
     sessionStorage.setItem("name", token.user ? token.user : "");
     sessionStorage.setItem("email", token.email);
     sessionStorage.setItem("role", token.role);
     sessionStorage.setItem("access_token", token.access_token);
     sessionStorage.setItem("refresh_token", token.refresh_token);
   }

   GetResetToken(email: string): Promise<any> {
    return this._client.get(`${this.LoginAPIEndpoint}/passwords/tokens?email=${email}`).toPromise();
  }
}
