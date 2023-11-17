import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelaComponent } from './createla.component';

describe('CreatelaComponent', () => {
  let component: CreatelaComponent;
  let fixture: ComponentFixture<CreatelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatelaComponent]
    });
    fixture = TestBed.createComponent(CreatelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
