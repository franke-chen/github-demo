import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { version } from "package.json";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLinear = false;
  title: string = "";
  constructor() {}

  ngOnInit() {
    document.title = "Cloud77 Sign Up";
    this.title = `Cloud77 Web (v${version})`;
  }

}
