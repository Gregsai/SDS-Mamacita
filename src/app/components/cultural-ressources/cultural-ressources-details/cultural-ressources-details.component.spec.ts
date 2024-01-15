import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalRessourcesDetailsComponent } from './cultural-ressources-details.component';

describe('CulturalRessourcesDetailsComponent', () => {
  let component: CulturalRessourcesDetailsComponent;
  let fixture: ComponentFixture<CulturalRessourcesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CulturalRessourcesDetailsComponent]
    });
    fixture = TestBed.createComponent(CulturalRessourcesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
