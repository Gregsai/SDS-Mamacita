import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesGroupActionComponent } from './courses-group-action.component';

describe('CoursesGroupActionComponent', () => {
  let component: CoursesGroupActionComponent;
  let fixture: ComponentFixture<CoursesGroupActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesGroupActionComponent]
    });
    fixture = TestBed.createComponent(CoursesGroupActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
