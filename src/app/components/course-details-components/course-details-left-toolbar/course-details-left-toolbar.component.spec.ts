import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsLeftToolbarComponent } from './course-details-left-toolbar.component';

describe('CourseDetailsLeftToolbarComponent', () => {
  let component: CourseDetailsLeftToolbarComponent;
  let fixture: ComponentFixture<CourseDetailsLeftToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDetailsLeftToolbarComponent]
    });
    fixture = TestBed.createComponent(CourseDetailsLeftToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
