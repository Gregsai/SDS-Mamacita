import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalRessourcesMainContentComponent } from './cultural-ressources-main-content.component';

describe('CulturalRessourcesMainContentComponent', () => {
  let component: CulturalRessourcesMainContentComponent;
  let fixture: ComponentFixture<CulturalRessourcesMainContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CulturalRessourcesMainContentComponent]
    });
    fixture = TestBed.createComponent(CulturalRessourcesMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
