import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildZeroComponent } from './child-zero.component';

describe('ChildZeroComponent', () => {
  let component: ChildZeroComponent;
  let fixture: ComponentFixture<ChildZeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildZeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildZeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
