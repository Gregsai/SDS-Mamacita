import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesHeadToolbarComponent } from './courses-head-toolbar.component';

describe('CoursesHeadToolbarComponent', () => {
  let component: CoursesHeadToolbarComponent;
  let fixture: ComponentFixture<CoursesHeadToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesHeadToolbarComponent]
    });
    fixture = TestBed.createComponent(CoursesHeadToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
