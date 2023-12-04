import { Component } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-filter-favorites',
  templateUrl: './courses-filter-favorites.component.html',
  styleUrls: ['./courses-filter-favorites.component.css']
})
export class CoursesFilterFavoritesComponent {
  showFavoritesOnly: boolean = false;

  constructor(private coursesService: CoursesService) {}

  onFilterChange(event: any) {
    this.showFavoritesOnly = event.target.checked;
    this.coursesService.updateCoursesWithFavorites(this.showFavoritesOnly)
  }
}
