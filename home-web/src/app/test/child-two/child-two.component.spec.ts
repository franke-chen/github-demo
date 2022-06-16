import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { ChildTwoComponent } from './child-two.component';

fdescribe('ChildTwoComponent', () => {
  let component: ChildTwoComponent;
  let fixture: ComponentFixture<ChildTwoComponent>;

  beforeEach(async () => {
    console.log('before each async is called');

    await TestBed.configureTestingModule({
      declarations: [ ChildTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    console.log('before each is called');

    fixture = TestBed.createComponent(ChildTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    console.log('after each is called');
    await setTimeout(() => {}, 2000);
  });

  afterAll(async () => {
    console.log('after all is called');
    await setTimeout(() => {}, 2000);
  });

  beforeAll(() => {
    console.log('before all is called');
  });

  it('case one should create', fakeAsync(() => {
    console.log('unit test case one is called');
    component.name = 'case one';
    expect(component).toBeTruthy();
    component.test();
    setTimeout(() => {
      console.log('case one 1000 delay');
    }, 1000);

    tick(1000);
    tick(1000);
    tick(1000);

    flush();

    console.log('unit test case one is end');
  }));

  it('case two should create', fakeAsync(() => {
    console.log('unit test case two is called');
    component.name = 'case two';
    expect(component).toBeTruthy();
    component.test();
    setTimeout(() => {
      console.log('case two 1000 delay');
    }, 1000);

    tick(1000);
    tick(1000);
    tick(1000);

    flush();

    console.log('unit test case two is end');
  }));
});
