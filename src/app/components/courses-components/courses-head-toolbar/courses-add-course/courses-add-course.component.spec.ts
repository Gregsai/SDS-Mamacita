import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAddCourseComponent } from './courses-add-course.component';

describe('CoursesAddCourseComponent', () => {
  let component: CoursesAddCourseComponent;
  let fixture: ComponentFixture<CoursesAddCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesAddCourseComponent]
    });
    fixture = TestBed.createComponent(CoursesAddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
