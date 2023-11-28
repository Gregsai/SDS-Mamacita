import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaCoursesTableComponent } from './la-courses-table.component';

describe('LaCoursesTableComponent', () => {
  let component: LaCoursesTableComponent;
  let fixture: ComponentFixture<LaCoursesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaCoursesTableComponent]
    });
    fixture = TestBed.createComponent(LaCoursesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
