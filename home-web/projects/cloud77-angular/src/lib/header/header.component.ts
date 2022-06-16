import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cloud77-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  title = 'todo';

  @Input()
  username = 'todo';

  @Output()
  logout: EventEmitter<void> = new EventEmitter();

  @Output()
  menuToggle: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.menuToggle.next();
  }

  onClick(): void {
    this.logout.next();
  }
}
