import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCartComponent } from './courses-cart.component';

describe('CoursesCartComponent', () => {
  let component: CoursesCartComponent;
  let fixture: ComponentFixture<CoursesCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesCartComponent]
    });
    fixture = TestBed.createComponent(CoursesCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
