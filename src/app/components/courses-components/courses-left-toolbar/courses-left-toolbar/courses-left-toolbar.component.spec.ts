import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesLeftToolbarComponent } from './courses-left-toolbar.component';

describe('CoursesLeftToolbarComponent', () => {
  let component: CoursesLeftToolbarComponent;
  let fixture: ComponentFixture<CoursesLeftToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesLeftToolbarComponent]
    });
    fixture = TestBed.createComponent(CoursesLeftToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
