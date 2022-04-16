import { Component, OnInit } from '@angular/core';
import { version } from 'package.json';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor() { }
  version = version;
  ngOnInit(): void {

  }

}
