import { AfterContentInit, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child-two',
  templateUrl: './child-two.component.html',
  styleUrls: ['./child-two.component.css']
})
export class ChildTwoComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit {

  id?: NodeJS.Timeout;

  count = 0;
  name = 'todo';

  constructor() {
    console.log('ctor is called');
    // this.id = setInterval(() => {
    //   this.count++;
    //   console.log(this.name + '  component is ticking  ' + this.count);
    //   if (this.count > 10) {
    //     if (this.id) {
    //       clearInterval(this.id);
    //     }

    //   }
    // }, 300);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes is called');
  }

  ngAfterViewInit(): void {
    console.log('after view init is called');

  }
  ngAfterContentInit(): void {
    console.log('after content init is called');
  }

  ngOnDestroy(): void {
    console.log('destroy is called');
    // if (this.id) {
    //   clearInterval(this.id);
    // }
  }

  ngOnInit(): void {
    console.log('init is called');
  }

  test(): void {
    setTimeout(() => {
      console.log(`${this.name} is timed out 500`);
    }, 500);

    setTimeout(() => {
      console.log(`${this.name} is timed out 1000`);
    }, 1000);

    setTimeout(() => {
      console.log(`${this.name} is timed out 1500`);
    }, 1500);

    setTimeout(() => {
      console.log(`${this.name} is timed out 2000`);
    }, 2000);

    setTimeout(() => {
      console.log(`${this.name} is timed out 2500`);
    }, 2500);

    setTimeout(() => {
      console.log(`${this.name} is timed out 3000`);
    }, 3000);

    setTimeout(() => {
      console.log(`${this.name} is timed out 3500`);
    }, 3500);

    setTimeout(() => {
      console.log(`${this.name} is timed out 4000`);
    }, 4000);
  }
}
