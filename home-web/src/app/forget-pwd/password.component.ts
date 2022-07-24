import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import info from 'package.json';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private client: HttpClient) { }

  email = '';

  token = '';

  password = '';

  password2 = '';

  title = '';

  ngOnInit(): void {

    // account is valid
    this.client.get('/login-api/prelogins?email=280908640@qq.com').subscribe(res => {
      console.log(res);
    });

    this.title = `Cloud77 Web (v${info.version})`;

    document.title = 'Cloud77 Forget Password';
  }


  getToken(): void {
    // send email
    this.client.put(`/login-api/passwords/tokens?email=${this.email}`, {}).subscribe(res => {
      console.log(res);
    });
  }

  savePassword(): void {
    this.client.put(`/login-api/passwords/forget`, {
      email: this.email,
      token: this.token,
      password: this.password
    }).subscribe(res => {
      console.log(res);
    });
  }
}
