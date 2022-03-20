import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { License, Profile } from 'src/app/interface';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService]
})
export class AccountComponent implements OnInit {

  constructor(private service: AccountService, private router: Router) { }

  ngOnInit(): void {

    this.service.getTodos();

    const  data = this.service.getAccountFromCache();
    if (data) {
      this.email = data.email;
      this.name = data.name;
      this._loadData();
    } else {
      this.router.navigate(["/login"]);
    }
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

  email: string = "";
  name:string = "";
  role:string = "";
  userId: number = 0;

  private async _loadData(): Promise<void> {

    await this.service.getAPIKey().then(res => {
      console.log("------apikey--------");
      console.log(res.apikey);
    });

    await this.service.loginPreCheck(this.email).then(res => {
      console.log("------login check--------");
      this.userId = res.userId;
    });

    await this.service.tokenCheck().then(res => {
      console.log("------token check--------");
      console.log(res);
      this.role = res.role;
    })

    await this.service.getLicense(this.userId).then(res => {
      console.log("------license--------");
      this.license = res;
    });

    await this.service.getProfile(this.userId).then(res => {
      console.log("------profile--------");
      this.profile = res;
    });

  }
}
