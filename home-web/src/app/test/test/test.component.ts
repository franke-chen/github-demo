import { Component, OnInit } from '@angular/core';
import { NavigationItem } from 'cloud77-angular';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  title = "hello cloud77";

  visible = true;

  username = "phantom";

  onLogout(): void {
    setTimeout(() => {
      alert("you are logout.");
    }, 100);
  }

  items: NavigationItem[] = [
    { label: 'zero', link: '', icon: 'dashboard' },
    { label: 'one', link: 'ch1', icon: 'dashboard' },
    { label: 'two', link: 'ch2', icon: 'dashboard' },
    { label: 'three', link: 'ch3', icon: 'dashboard' }
  ];
}
