import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesService } from '../../../../services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<any[]> | undefined;
  courseIdToDelete: string | null = null;
  showDeleteConfirmation = false;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.courses$ = this.coursesService.courses$;
  }

  deleteCourses(courseId: string) {
    this.courseIdToDelete = courseId;
    this.showDeleteConfirmation = true; // Afficher la confirmation
  }

  confirmDelete() {
    if (this.courseIdToDelete) {
      this.coursesService.deleteCourse(this.courseIdToDelete);
      this.cancelDelete(); // Réinitialiser les variables après la suppression
    }
  }

  cancelDelete() {
    this.courseIdToDelete = null;
    this.showDeleteConfirmation = false; // Cacher la confirmation
  }
}
