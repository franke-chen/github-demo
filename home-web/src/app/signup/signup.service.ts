import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AppCommonService } from 'src/app/services';

export interface AccountPostBody {
  token: string;
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class SignUpService extends AppCommonService {
  public getEmailToken(email: string): Promise<void> {
    const params: HttpParams = new HttpParams().set('email', email);
    return this.client.get<void>(`${this.LoginAPIEndpoint}/emailTokens`, { params }).toPromise();
  }

  public postAccount(body: AccountPostBody): Promise<void> {
    return this.client.post<void>(`${this.LoginAPIEndpoint}/accounts`, body).toPromise();
  }
}
