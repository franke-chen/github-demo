import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Device, DevicePostBody, License, LicenseKey, LicensePostBody, Profile, ProfilePostBody, Region, Scope } from 'src/app/interfaces';
import { AppCommonService } from 'src/app/services';

@Injectable()
export class AccountService extends AppCommonService {

  getLicense(userId: number): Promise<License> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.client.get<License>(`${this.ClientAPIEndpoint}/licenses`, { params }).toPromise();
  }

  getLicenseKey(userId: number): Promise<LicenseKey> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.client.get<LicenseKey>(`${this.ClientAPIEndpoint}/licenses/keys`, { params }).toPromise();
  }

  getProfile(userId: number): Promise<Profile> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.client.get<Profile>(`${this.ClientAPIEndpoint}/profiles`, { params }).toPromise();
  }

  getDevices(userId: number): Promise<Device[]> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.client.get<Device[]>(`${this.ClientAPIEndpoint}/devices`, { params }).toPromise();
  }

  getRegions(): Promise<Region[]> {
    return this.client.get<Region[]>(`${this.ClientAPIEndpoint}/service-info/regions`).toPromise();
  }

  getScopes(): Promise<Scope[]> {
    return this.client.get<Scope[]>(`${this.ClientAPIEndpoint}/service-info/scopes`).toPromise();
  }

  postProfile(body: ProfilePostBody): Promise<HttpResponse<void>> {
    return this.client.post<void>(`${this.ClientAPIEndpoint}/profiles`, body, { observe: 'response' }).toPromise();
  }

  postLicense(body: LicensePostBody): Promise<HttpResponse<void>> {
    return this.client.post<void>(`${this.ClientAPIEndpoint}/licenses`, body, { observe: 'response' }).toPromise();
  }

  postDevice(body: DevicePostBody): Promise<any> {
    console.log(body);
    return this.client.post(`${this.ClientAPIEndpoint}/devices`, body).toPromise();
  }
}
