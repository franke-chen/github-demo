import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AppCommonService } from 'src/app/services';

@Injectable()
export class SettingService extends AppCommonService {

  deleteAccount(email: string, userId: number): Promise<HttpResponse<void>> {
    let params: HttpParams = new HttpParams();
    params = params.set('email', email);
    params = params.set('userId', userId.toString());
    return this.client.delete<void>(`${this.LoginAPIEndpoint}/accounts/${userId}`, { params, observe: 'response' }).toPromise();
  }

  deleteDevices(email: string, userId: number): Promise<HttpResponse<void>> {
    let params: HttpParams = new HttpParams();
    params = params.set('email', email);
    params = params.set('userId', userId.toString());
    return this.client.delete<void>(`${this.ClientAPIEndpoint}/devices`, { params, observe: 'response' }).toPromise();
  }

  deleteLicense(email: string, userId: number): Promise<HttpResponse<void>> {
    let params: HttpParams = new HttpParams();
    params = params.set('email', email);
    params = params.set('userId', userId.toString());
    return this.client.delete<void>(`${this.ClientAPIEndpoint}/licenses`, { params, observe: 'response' }).toPromise();
  }

  deleteProfile(email: string, userId: number): Promise<HttpResponse<void>> {
    let params: HttpParams = new HttpParams();
    params = params.set('email', email);
    params = params.set('userId', userId.toString());
    return this.client.delete<void>(`${this.ClientAPIEndpoint}/profiles`, { params, observe: 'response' }).toPromise();
  }

  public getProducts(): Promise<any> {
    return this.client.get(`${this.LoginAPIEndpoint}/products`).toPromise();
  }

  getAuthors(): Promise<any> {
    return this.client.get(`${this.LoginAPIEndpoint}/authors`).pipe(
      tap(res => console.log(res))
    ).toPromise();
  }

  postAuthor(name: string, title: string): Promise<any> {
    return this.client.post(`${this.LoginAPIEndpoint}/authors`, { name, title }).toPromise();
  }
}
