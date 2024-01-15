import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CulturalressourcesService } from 'src/app/services/culturalressources.service';

@Component({
  selector: 'app-cultural-ressources',
  templateUrl: './cultural-ressources.component.html',
  styleUrls: ['./cultural-ressources.component.css']
})
export class CulturalRessourcesComponent {
  activities$: Observable<any[]> | undefined;

  constructor(
    private culturalressourcesService: CulturalressourcesService,
  ) { }

  ngOnInit(): void {
    this.activities$ = this.culturalressourcesService.activities$;
  }
}
