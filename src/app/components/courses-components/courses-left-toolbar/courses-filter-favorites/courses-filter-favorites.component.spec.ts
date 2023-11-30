import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesFilterFavoritesComponent } from './courses-filter-favorites.component';

describe('CoursesFilterFavoritesComponent', () => {
  let component: CoursesFilterFavoritesComponent;
  let fixture: ComponentFixture<CoursesFilterFavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesFilterFavoritesComponent]
    });
    fixture = TestBed.createComponent(CoursesFilterFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
