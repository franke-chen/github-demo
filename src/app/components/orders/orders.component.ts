import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  selected: Date | null = null;

  constructor() { }

  ngOnInit(): void {
    this.selected = new Date();
  }
}
