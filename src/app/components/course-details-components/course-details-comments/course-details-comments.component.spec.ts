import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsCommentsComponent } from './course-details-comments.component';

describe('CourseDetailsCommentsComponent', () => {
  let component: CourseDetailsCommentsComponent;
  let fixture: ComponentFixture<CourseDetailsCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDetailsCommentsComponent]
    });
    fixture = TestBed.createComponent(CourseDetailsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
