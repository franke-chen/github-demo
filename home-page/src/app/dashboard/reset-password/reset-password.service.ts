import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendService } from "src/app/backend.service";

export interface PasswordPutBody {
  email: string,
  password: string,
  newPassword: string
}

@Injectable()
export class ResetPasswordService extends BackendService {
  updatePassword(body: PasswordPutBody): Promise<HttpResponse<void>> {
    return this._client.put<void>(`${this.LoginAPIEndpoint}/passwords/reset`, body, { observe: "response" }).toPromise();
  }
}
