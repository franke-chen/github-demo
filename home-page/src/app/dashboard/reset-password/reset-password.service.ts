import { Injectable } from "@angular/core";
import { BackendService } from "src/app/backend.service";

@Injectable()
export class ResetPasswordService extends BackendService {
  updatePassword(): Promise<any> {
    return this._client.put(`${this.LoginAPIEndpoint}/products?code=200`, {}).toPromise();
  }
}
