import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CulturalressourcesService } from 'src/app/services/culturalressources.service';

@Component({
  selector: 'app-cultural-ressources-main-content',
  templateUrl: './cultural-ressources-main-content.component.html',
  styleUrls: ['./cultural-ressources-main-content.component.css']
})
export class CulturalRessourcesMainContentComponent {
  activities$: Observable<any[]> | undefined;

  constructor(
    private culturalressourcesService: CulturalressourcesService,
  ) { }

  ngOnInit(): void {
    this.activities$ = this.culturalressourcesService.activities$;
  }
}
