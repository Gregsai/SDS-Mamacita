import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaListMenuComponent } from './la-list-menu.component';

describe('LaListMenuComponent', () => {
  let component: LaListMenuComponent;
  let fixture: ComponentFixture<LaListMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaListMenuComponent]
    });
    fixture = TestBed.createComponent(LaListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
