import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationItem } from '../interface';

@Component({
  selector: 'cloud77-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  visible = true;

  @Input()
  username = '';

  @Input()
  title = '';

  @Input()
  items: NavigationItem[] = [];

  @Input()

  public get activeLink(): string {
    return this.link;
  }

  public set activeLink(v: string) {
    this.link = v;
    if (v === '/') {
      this.visible = false;
    } else {
      let l = v;
      if (v.includes('?')) {
        l = v.split('?')[0];
      }
      this.visible = this.items.find(i => l.startsWith(i.link)) ? true : false;
    }
  }

  link = '';

  opened = true;

  @Output()
  logout: EventEmitter<void> = new EventEmitter();

  @Output()
  linkTo: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onMenuToggle(): void {
    this.opened = !this.opened;
  }

  onLogout(): void {
    this.logout.emit();
    this.visible = false;
  }

  onLinkTo(link: string): void {
    this.linkTo.emit(link);
  }
}
