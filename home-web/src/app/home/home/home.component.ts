import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, ContentChildren, Inject, Input, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Guid } from 'guid-typescript';
import { from, fromEvent, generate, interval, merge, of, timer } from 'rxjs';
import { catchError, delay, map, mapTo, mergeAll, mergeMap, startWith, take, takeUntil, tap } from 'rxjs/operators';

interface Bookmark {
  title: string;
  url: string;
  keywords: string[];
}

@Component({
  selector: 'app-home-child',
  template: `<button mat-raised-button color='primary'>{{ content }}</button><p>{{ content }}</p><ng-content></ng-content>`
})
export class HomeChildComponent {

  @Input()
  content = 'default content';

  @ContentChildren(MatButton)
  buttons!: QueryList<MatButton>;

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public title = 'cloud77 home page';
  public guid = '';

  bookmarks?: Bookmark[];

  constructor(@Inject(PLATFORM_ID) private platformId: object, private http: HttpClient) { }

  @ViewChildren(HomeChildComponent)
  public childs!: QueryList<HomeChildComponent>;

  ngOnInit(): void {

    console.log(this.platformId);
    console.log(isPlatformBrowser(this.platformId));

    this.guid = Guid.create().toString();

    const keydown$ = fromEvent<KeyboardEvent>(document, 'keydown');
    const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup');

    keydown$.pipe(
      mergeMap(event => of(event).pipe(delay(2000), takeUntil(keyup$)))
    ).subscribe(event => {
      console.log('long press!', event);
    });

    of({ user: 'user' }).pipe(delay(3000), takeUntil(keyup$)).subscribe(user => {
      console.log(user);
    });

    of(null).pipe(mapTo('hello'), delay(4000), tap(x => console.log(x))).subscribe(x => {
      console.log('after tap');
      console.log(x);
    });

    fromEvent(document, 'click').pipe(mapTo('Hi')).subscribe(x => console.log(x));

    const example = of('todo');

    const message = merge(
      example.pipe(mapTo('hello')),
      example.pipe(mapTo('world'), delay(1000)),
      example.pipe(mapTo('good bye'), delay(9000)),
      example.pipe(mapTo('world'), delay(10000))
    );

    message.subscribe(x => console.log(x));

    generate(2, x => x <= 8, x => x + 3, x => '$'.repeat(x)).subscribe(x => console.log(x));

    from([1, 2, 3, 4, 5]).subscribe(x => console.log(x));

    console.log('-------------------------');

    from(new Promise<string>(resolve => resolve('hello world'))).subscribe(x => console.log(x));

    // const map = new Map<string, string>();
    // map.set('1', 'hi');
    // map.set('2', 'bye');

    // from(map).subscribe(x => console.log(x));

    of(1, 2, 3).pipe(
      map(x => new Promise(
        resolve => setTimeout(() => {
          resolve(`Result: ${x}`);
        }, x * 1000)
      )),
      mergeAll()
    ).subscribe(x => console.log(x));

    interval(2000).pipe(take(5)).subscribe(x => console.log(`${x * 2}s`));

    timer(3500).subscribe(x => console.log(x));

    const btn = document.querySelector('#btn');
    if (btn)
    {
      fromEvent<MouseEvent>(btn, 'click').pipe(
        mapTo('Found me'),
        startWith('click me'),
      ).subscribe(x => btn.innerHTML = x);
    }

    setTimeout(() => {
      this.childs.forEach(child => {
        child.content = 'todo for child';
        child.buttons.forEach(button => {
          button.color = 'accent';
          button.disabled = true;
        });

      });
    }, 2000);


    of({ user: 'franke' }).subscribe(a => console.log(a));

    of(1 , 2, 3, 4, 5).pipe(
      tap(i => {
        console.log('----------------');
        console.log(i);
      }),
      map(i => {
        if (i === 4) {
          throw new Error('bad number');
        } else {
          return i;
        }
      }),
      catchError(err => {
        console.error(err.message);
        return of(-1);
      })
    ).subscribe(res => {
      console.log('------------------after');
      console.log(res);
    });

    this.http.get<Bookmark[]>('assets/bookmarks.json').subscribe(res => {
      console.log(res);
      this.bookmarks = res;
    });


  }

  confirm(): void {
    // const result = confirm('are you sure');
    // console.log(result);

    // const person = prompt('input name', 'todo');
    // console.log(person);

    alert('todo\ntodo');
  }

}
