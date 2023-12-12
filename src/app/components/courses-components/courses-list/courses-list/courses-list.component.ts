import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesService } from '../../../../services/courses.service';
import { CreatelaService } from 'src/app/services/createla.service';
import { UserService } from 'src/app/services/user.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<any[]> | undefined;
  courseIdToDelete: string | null = null;
  showDeleteConfirmation = false;
  isLoggedIn: boolean = false;
  status: string = '';
  favorites$: Observable<any[]> | undefined;

  constructor(
    private coursesService: CoursesService,
    private createlaService: CreatelaService,
    private userService: UserService,
    private favoritesService: FavoritesService,
    ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.courses$ = this.coursesService.courses$;
    this.favorites$ = this.favoritesService.favorites$
    this.getStatus();
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
  /*
  copyItemToTable(item: any): void {
    this.createlaService.copyItemToTable('courses', 'tablelafavorites', item)
      .then(() => {
        // Additional logic after copying item to Table 1
      });
  }
  */
  getStatus(): void {
    if (this.isLoggedIn) {
      this.status = this.userService.getStatus();
    }
  }

  toggleFavorite(courseId: string) {
    this.favoritesService.toggleCourseFavorite(courseId)
      .then(() => {
        const button = document.querySelector(`button[data-course-id="${courseId}"]`);
        if (button) {
          const img = button.querySelector('img');
          if (img) {
            const imgSrc = img.getAttribute('src');
            console.log("hey");
            const newImgSrc = imgSrc === './../../assets/images/heart-official.png'
              ? './../../assets/images/full-heart-official.png'
              : './../../assets/images/heart-official.png';
            img.setAttribute('src', newImgSrc);
          }
        }
      })
      .catch((error) => {
        // Manage error
      });
  }

  isCourseFavorited(courseId: string): boolean {
    let isFavorited = false;

    this.favoritesService.favorites$.subscribe((favoriteCourses: any[]) => {
      isFavorited = favoriteCourses.some(course => course.id === courseId);
    });

    return isFavorited;
  }
}
