import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PreLogin, TokenDto } from "src/app/interface";
import { BackendService } from "../../backend.service";

export interface AccountData {
  account: string | undefined
  rememberme: boolean
}
@Injectable()
export class LoginService extends BackendService {

  public getAccountFromCache(): AccountData | undefined {
    const data: AccountData = {
      account: undefined,
      rememberme: false
    }

    if (sessionStorage.getItem("email")) {
      if (!data.account) {
        data.account = String(sessionStorage.getItem("email"));
      }
    }

    if (sessionStorage.getItem("name")) {
      if (!data.account) {
        data.account = String(sessionStorage.getItem("name"));
      }
    }

    if (!data.account) {
      return;
    }

    const reme = sessionStorage.getItem("rememberme");
    if (reme && reme === "true") {
      data.rememberme = true;
    }
    return data;
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

   public saveToken(token: TokenDto, reme: boolean = false): void {
    sessionStorage.setItem("access_token", token.access_token);
    sessionStorage.setItem("refresh_token", token.refresh_token);
    sessionStorage.setItem("name", token.user ? token.user : "");
    sessionStorage.setItem("email", token.email);

    if (reme) {
     sessionStorage.setItem("rememberme", "true");
    }
  }

   GetResetToken(email: string): Promise<any> {
    return this._client.get(`${this.LoginAPIEndpoint}/passwords/tokens?email=${email}`).toPromise();
  }

  public loginPreCheck(email: string): Promise<PreLogin> {
    const params = new HttpParams().set("email", email);
    return this._client.get<PreLogin>(`${this.LoginAPIEndpoint}/prelogins`, { params: params }).toPromise();
  }
}
