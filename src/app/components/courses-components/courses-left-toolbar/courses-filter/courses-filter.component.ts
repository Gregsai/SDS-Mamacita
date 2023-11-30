import { Component } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-filter',
  templateUrl: './courses-filter.component.html',
  styleUrls: ['./courses-filter.component.css']
})
export class CoursesFilterComponent {
  filters: any = {}; // Assurez-vous que vos filtres correspondent à la structure des données attendues
  
  constructor(private coursesService: CoursesService) {}

  applyFilters(): void {
    // Appliquer les filtres seulement s'ils sont renseignés
    const appliedFilters: any = {};
    if (this.filters.name) {
      appliedFilters.name = this.filters.name;
    }
    if (this.filters.faculty) {
      appliedFilters.faculty = this.filters.faculty;
    }
    if (this.filters.semester) {
      appliedFilters.semester = this.filters.semester;
    }
    if (this.filters.ects) {
      appliedFilters.ects = this.filters.ects;
    }
    if (this.filters.language) {
      appliedFilters.language = this.filters.language;
    }
    
    // Mettre à jour les cours en fonction des filtres appliqués
    this.coursesService.updateCoursesWithFilters(appliedFilters);
  }
}
