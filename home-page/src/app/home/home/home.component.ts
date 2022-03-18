import { Component, OnInit } from '@angular/core';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _title = 'cloud77 home page';
  public title = "unknown";
  public guid: string = "";

  constructor() { }

  ngOnInit(): void {
    this.title = `${this._title}`;
    this.guid = Guid.create().toString();
  }
}
