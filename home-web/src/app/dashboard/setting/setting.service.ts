import { HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { BackendService } from "src/app/backend.service";
import { License, Profile } from "src/app/interface";

@Injectable()
export class SettingService extends BackendService {

  deleteAccount(email: string, userId: number): Promise<HttpResponse<void>> {
    let params: HttpParams = new HttpParams();
    params = params.set("email", email);
    params = params.set("userId", userId.toString());
    return this._client.delete<void>(`${this.LoginAPIEndpoint}/accounts/${userId}`, { params: params, observe: "response" }).toPromise();
  }

  deleteDevices(email: string, userId: number): Promise<HttpResponse<void>> {
    let params: HttpParams = new HttpParams();
    params = params.set("email", email);
    params = params.set("userId", userId.toString());
    return this._client.delete<void>(`${this.ClientAPIEndpoint}/devices`, { params: params, observe: "response" }).toPromise();
  }

  deleteLicense(email: string, userId: number): Promise<HttpResponse<void>> {
    let params: HttpParams = new HttpParams();
    params = params.set("email", email);
    params = params.set("userId", userId.toString());
    return this._client.delete<void>(`${this.ClientAPIEndpoint}/licenses`, { params: params, observe: "response" }).toPromise();
  }

  deleteProfile(email: string, userId: number): Promise<HttpResponse<void>> {
    let params: HttpParams = new HttpParams();
    params = params.set("email", email);
    params = params.set("userId", userId.toString());
    return this._client.delete<void>(`${this.ClientAPIEndpoint}/profiles`, { params: params, observe: "response" }).toPromise();
  }

  public getProducts(): Promise<any> {
    return this._client.get(`${this.LoginAPIEndpoint}/products`).toPromise();
  }

  public getTodos(): Promise<any> {
    return this._client.get("https://jsonplaceholder.typicode.com/todos/1").pipe(
      tap(res => console.log(res))
    ).toPromise();
  }

  getAuthors(): Promise<any> {
    return this._client.get(`${this.LoginAPIEndpoint}/info/authors`).pipe(
      tap(res => console.log(res))
    ).toPromise();
  }
}
