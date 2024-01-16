import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalRessourcesDetailsLeftToolbarComponent } from './cultural-ressources-details-left-toolbar.component';

describe('CulturalRessourcesDetailsLeftToolbarComponent', () => {
  let component: CulturalRessourcesDetailsLeftToolbarComponent;
  let fixture: ComponentFixture<CulturalRessourcesDetailsLeftToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CulturalRessourcesDetailsLeftToolbarComponent]
    });
    fixture = TestBed.createComponent(CulturalRessourcesDetailsLeftToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
