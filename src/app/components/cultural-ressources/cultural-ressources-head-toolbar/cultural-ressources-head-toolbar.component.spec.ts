import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalRessourcesHeadToolbarComponent } from './cultural-ressources-head-toolbar.component';

describe('CulturalRessourcesHeadToolbarComponent', () => {
  let component: CulturalRessourcesHeadToolbarComponent;
  let fixture: ComponentFixture<CulturalRessourcesHeadToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CulturalRessourcesHeadToolbarComponent]
    });
    fixture = TestBed.createComponent(CulturalRessourcesHeadToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
