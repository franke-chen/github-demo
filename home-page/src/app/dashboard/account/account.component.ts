import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

export interface License {
  id: number;
  userId: number;
  email: string;
  status: string;
  licenseType: string;
  region: string;
  scope: string;
  option1: number;
  option2: number;
  option3: string;

  timestamp: Date
}

export interface Profile {
  id: number,
  uid: number,
  surname: string;
  givenName: string;
  city: string;
  phone: string;
  company: string;
  companyType: string;
  title: string;
  contact: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    this.client.get<License>("/management-api/licenses/20789").subscribe(res => {
      console.log(res);
      this.license = res;
    });

    this.client.get<Profile>("/management-api/licenses/profiles/20789").subscribe(res => {
      console.log(res);
      this.profile = res;
    });

    this.name = sessionStorage.getItem("name");
    this.email = sessionStorage.getItem("email");
    this.role = sessionStorage.getItem("role");
  }

  profile!: Profile;
  license!: License;
  email!: string | null | undefined;
  name!:string | null | undefined;
  role!:string | null | undefined;
}
