import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NavigationItem } from 'cloud77-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cloud77-angular-demo';

  items: NavigationItem[] = [
    { label: 'child a', link: '/child-a', icon: 'dashboard' },
    { label: 'child b', link: '/child-b', icon: 'dashboard' },
    { label: 'child c', link: '/child-c', icon: 'dashboard' }
  ];

  activeLink = "/";

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((e) => {

      if (e instanceof NavigationStart) {
        this.activeLink = e.url;
      }
      // if (e instanceof NavigationEnd) {

      // }
   });
  }

  onLogout(): void {
    this.title = 'you are logout.';
    this.router.navigate(['']);
  }

  onLinkTo(link: string): void {
    this.title = `you are linked to ${link}`;
    this.router.navigate([link]);
  }
}
