import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Device, License, Profile, Region, Scope } from 'src/app/interface';
import { SNACKBAR_DURATION } from 'src/environments/environment.share';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService]
})
export class AccountComponent implements OnInit {

  constructor(private service: AccountService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.service.pageInitCheck(true).then(account => {
      console.log("page can init");
      console.log(account);
      if (account) {
        this.email = account.email;
        this.name = account.name;
        this.userId = account.userId as number;
        this.role = account.role;
        this._pageLoadData();
      }
    }, err => {
      console.error(err);
      console.log("page can not init");
      this.router.navigate(["/login"]);
    });
  }

  profile: Profile = {
    id: 0,
    uid: 0,
    surname: "",
    givenName: "",
    company: "",
    companyType: "",
    city: "",
    title: "",
    phone: "",
    contact: ""
  }

  license: License = {
    id: 0,
    userId: 0,
    email: "",
    licenseType: "",
    status: "",
    scope: "",
    region: "",
    option1: 0,
    option2: 0,
    option3: "",
  }

  foundLicense: boolean = false;
  foundProfile: boolean = false;

  showProfile: boolean = false;

  email: string = "";
  name:string = "";
  role:string = "";
  userId: number = 0;

  scopeId: string = "";
  regionId: string = "";

  regions: Region[] = [];
  scopes: Scope[] = [];
  devices: Device[] = [];

  profileBtnDisabled: boolean = false;
  licenseBtnDisabled: boolean = false;

  private async _pageLoadData(): Promise<void> {

    await this.service.getProfile(this.userId).then(res => {
      console.log("------profile--------");
      this.profile = res;
      this.foundProfile = true;
    }, err => {
      console.error(err);
    });

    await this.service.getScopes().then(res => {
      this.scopes = res;
    });

    await this.service.getRegions().then(res => {
      this.regions = res;
    });

    this.scopeId = this.scopes[0].guid;
    this.regionId = this.regions[0].guid;

    await this.getLicense();

    await this.getDevices();

    this.service.getLicenseKey(this.userId).then(res => {
      console.log(res);
    })
  }

  saveProfile(): void {
    this.profileBtnDisabled = true;

    console.log(this.profile);

    if (this.foundProfile) {

    } else {
      this.service.postProfile({
        email: this.email,
        userId: this.userId,
        surname: this.profile.surname,
        givenName: this.profile.givenName,
        company: this.profile.company,
        companyType: this.profile.companyType,
        city: this.profile.city,
        phone: this.profile.phone,
        contact: this.profile.contact,
        title: this.profile.title
      }).then(res => {
        this.snackbar.open("Info", "Already submit your profile", { duration: SNACKBAR_DURATION });
        this.foundProfile = true;
      }, err => {
        this.snackbar.open("Error", "Fail to submit your profile", { duration: SNACKBAR_DURATION });
      }).finally(() => {
        setTimeout(() => {
          this.profileBtnDisabled = false;
        }, 2000);
      });
    }
  }

  saveLicense(): void {
    this.licenseBtnDisabled = true;
    this.service.postLicense({
      email: this.email,
      userId: this.userId,
      scopeId: this.scopeId,
      regionId: this.regionId
    }).then(res => {
      console.log(res);
      setTimeout(() => {
        this.getLicense();
      }, 0);
    }, err => {
      console.error(err)
      this.licenseBtnDisabled = false;
    })
  }

  createMockDevice(): void {
    console.log(this.userId);
    this.service.postDevice({
      email: this.email,
      userId: this.userId,
      machineCode: "6EC00669251",
      installDate: "20210318XX4431",
      appVer: "1.0.0.0"
    }).then(() => {
      this.snackbar.open("Info", "Already submit your device", { duration: SNACKBAR_DURATION });
      this.getDevices();
    }, err => {
      console.log(err);
      this.snackbar.open("Error", "Fail to submit your device", { duration: SNACKBAR_DURATION });
    })
  }

  asyncTest(): void {
    new Promise((resolve, reject) => {
      if (!this.foundProfile) {
        resolve("find profile");
      }
      else {
        reject("find no profile");
      }
    }, ).then(res => {
      console.log(res);
      return Promise.resolve<string>("find profile");
    }, err => {
      console.log(err);
      return Promise.resolve("already catch error");
    })
    .then(res => {
      console.log(res);
    }, err => {
      console.error(err);
      return Promise.resolve("todo")
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      console.log("end");
    })
  }

  async getLicense(): Promise<void> {
    await this.service.getLicense(this.userId).then(res => {
      console.log("------license--------");
      this.license = res;
      this.foundLicense = true;
    }, err => {
      console.error(err);

      this.scopeId = this.scopes[0].guid;
      this.regionId = this.regions[0].guid;
    });
  }

  async getDevices(): Promise<void> {
    await this.service.getDevices(this.userId).then(res => {
      this.devices = res;
    }, err => {
      console.error(err);
    })
  }
}
