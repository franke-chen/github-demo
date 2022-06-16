import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppCommonService } from 'src/app/services';

export interface PasswordPutBody {
  email: string;
  password: string;
  newPassword: string;
}

@Injectable()
export class ResetPasswordService extends AppCommonService {
  updatePassword(body: PasswordPutBody): Promise<HttpResponse<void>> {
    return this.client.put<void>(`${this.LoginAPIEndpoint}/passwords/reset`, body, { observe: 'response' }).toPromise();
  }
}
