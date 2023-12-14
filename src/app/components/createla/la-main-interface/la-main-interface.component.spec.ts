import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaMainInterfaceComponent } from './la-main-interface.component';

describe('LaMainInterfaceComponent', () => {
  let component: LaMainInterfaceComponent;
  let fixture: ComponentFixture<LaMainInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaMainInterfaceComponent]
    });
    fixture = TestBed.createComponent(LaMainInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
