import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaFavoritesTableComponent } from './la-favorites-table.component';

describe('LaFavoritesTableComponent', () => {
  let component: LaFavoritesTableComponent;
  let fixture: ComponentFixture<LaFavoritesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaFavoritesTableComponent]
    });
    fixture = TestBed.createComponent(LaFavoritesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
