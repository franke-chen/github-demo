import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAAComponent } from './child-a-a.component';

describe('ChildAAComponent', () => {
  let component: ChildAAComponent;
  let fixture: ComponentFixture<ChildAAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildAAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
