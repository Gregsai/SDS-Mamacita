import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalRessourcesDetailsCommentsComponent } from './cultural-ressources-details-comments.component';

describe('CulturalRessourcesDetailsCommentsComponent', () => {
  let component: CulturalRessourcesDetailsCommentsComponent;
  let fixture: ComponentFixture<CulturalRessourcesDetailsCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CulturalRessourcesDetailsCommentsComponent]
    });
    fixture = TestBed.createComponent(CulturalRessourcesDetailsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
