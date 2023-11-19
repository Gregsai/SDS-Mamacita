import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesFilterComponent } from './courses-filter.component';

describe('CoursesFilterComponent', () => {
  let component: CoursesFilterComponent;
  let fixture: ComponentFixture<CoursesFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesFilterComponent]
    });
    fixture = TestBed.createComponent(CoursesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
