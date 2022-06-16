import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { NavigationItem } from '../interface';

@Component({
  selector: 'cloud77-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input()

  public get items(): NavigationItem[] {
    return this.itemsSrc;
  }


  public set items(v: NavigationItem[]) {
    this.itemsSrc = v;
    this.activeLink = this.itemsSrc[0].link;
  }

  @Input()

  public get activeLink(): string {
    return this.link;
  }

  public set activeLink(v: string) {
    this.link = v;
    let l = v;
    if (v.includes('?')) {
      l = v.split('?')[0];
    }
    this.selectedItem = this.itemsSrc.find(i => l.startsWith(i.link));
  }

  private link = '';

  private itemsSrc: NavigationItem[] = [];

  selectedItem?: NavigationItem;

  @Output()
  linkTo: EventEmitter<string> = new EventEmitter();

  onSelectionChange(event: MatSelectionListChange): void
  {
    this.linkTo.emit(event.options[0].value);
  }

  constructor() { }

  ngOnInit(): void {

  }

}
