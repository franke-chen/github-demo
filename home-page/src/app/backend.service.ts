import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  public ManagementAPIEndpoint = location.origin + "/" + "management-api";

  // callAPI(endpoint: string): Promise<object> {
  //   return this._client.get(endpoint).toPromise();
  // }

  // async Get11AllSalesMenAsync(): Promise<SalesMan[]> {
  //   const url = `${APIPrefix}${'/salesmen'}`
  //   return await this.client.get<SalesMan[]>(url, { observe: "body", responseType: "json" }).toPromise()
  // }

  // async Get11SalesMenAsync (domain: string, region: string): Promise<SalesMan[]> {
  //   const url = `${APIPrefix}${'/salesmen'}`
  //   const params = new HttpParams().set('domain', domain).set('country', region)
  //   return await this.client.get<SalesMan[]>(url, { params: params, observe: "body", responseType: "json" }).toPromise()
  // }

  // callFromFakeAPI(): Promise<object> {
  //   return this.client.get("https://jsonplaceholder.typicode.com/todos/1").toPromise();
  // }

  // callHealth(): Promise<string> {
  //   return this.client.get(`${APIPrefix}/health`, { responseType: "text" }).toPromise<string>();
  // }
}
