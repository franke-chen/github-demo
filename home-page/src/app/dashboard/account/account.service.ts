import { Injectable } from "@angular/core";
import { BackendService } from "src/app/backend.service";
import { License, Profile } from "src/app/interface";

@Injectable()
export class AccountService extends BackendService {

  getLicense(userId: number): Promise<License> {
    return this._client.get<License>(`${this.ClientAPIEndpoint}/licenses/${userId}`).toPromise();
  }

  getProfile(userId: number): Promise<Profile> {
    return this._client.get<Profile>(`${this.ClientAPIEndpoint}/profiles/${userId}`).toPromise();
  }
}
