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

  public get items() : NavigationItem[] {
    return this._items;
  }


  public set items(v : NavigationItem[]) {
    this._items = v;
    this.activeLink = this._items[0].link;
  }

  @Input()

  public get activeLink() : string {
    return this._activeLink;
  }

  public set activeLink(v : string) {
    this._activeLink = v;
    let link = v;
    if (v.includes('?')) {
      link = v.split('?')[0];
    }
    this.selectedItem = this._items.find(i => link.startsWith(i.link));
  }

  _activeLink: string = "";

  private _items: NavigationItem[] = [];
  selectedItem?: NavigationItem;

  @Output()
  linkTo: EventEmitter<string> = new EventEmitter();

  onSelectionChange(event: MatSelectionListChange)
  {
    this.linkTo.emit(event.options[0].value);
  }
  constructor() { }

  ngOnInit(): void {

  }

}
