import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { version } from "package.json";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private client: HttpClient) { }

  email: string = "";

  token: string = "";

  password: string = "";

  password2: string = "";

  ngOnInit(): void {
    this.client.get("/login-api/prelogins?email=280908640@qq.com").subscribe(res => {
      console.log(res);
    });

    this.title = `Cloud77 Web (v${version})`;

    document.title = "Cloud77 Forget Password";
  }
  title: string = "";

  getToken(): void {
    // send email
    this.client.put(`/login-api/passwords/tokens?email=${this.email}`, {}).subscribe(res => {
      console.log(res);
    })
  }

  savePassword(): void {
    this.client.put(`/login-api/passwords?email=${this.email}`, {
      email: this.email,
      token: this.token,
      password: this.password
    }).subscribe(res => {
      console.log(res);
    })
  }
}
