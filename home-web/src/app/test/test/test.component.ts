import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationItem } from 'cloud77-angular';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  title = 'hello cloud77';

  visible = true;

  username = 'phantom';

  items: NavigationItem[] = [
    { label: 'zero', link: '', icon: 'dashboard' },
    { label: 'one', link: '/test/ch1', icon: 'dashboard' },
    { label: 'two', link: '/test/ch2', icon: 'dashboard' },
    { label: 'three', link: '/test/ch3', icon: 'dashboard' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  onLogout(): void {
    setTimeout(() => {
      alert('you are logout.');
    }, 100);
  }

  onLinkTo(link: string): void {
    this.router.navigate([link], { relativeTo: this.route });
  }
}
