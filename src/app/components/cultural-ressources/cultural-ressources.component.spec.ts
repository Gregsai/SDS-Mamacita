import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalRessourcesComponent } from './cultural-ressources.component';

describe('CulturalRessourcesComponent', () => {
  let component: CulturalRessourcesComponent;
  let fixture: ComponentFixture<CulturalRessourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CulturalRessourcesComponent]
    });
    fixture = TestBed.createComponent(CulturalRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
