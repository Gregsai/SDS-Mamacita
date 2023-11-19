import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesBisComponent } from './courses-bis.component';

describe('CoursesBisComponent', () => {
  let component: CoursesBisComponent;
  let fixture: ComponentFixture<CoursesBisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesBisComponent]
    });
    fixture = TestBed.createComponent(CoursesBisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
