import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesService } from '../../../../services/courses.service';
import { CreatelaService } from 'src/app/services/createla.service';
import { UserService } from 'src/app/services/user.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { LearningagreementService } from 'src/app/services/learningagreement.service';

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
  isDropdownOpen: boolean = false;
  las$: Observable<any[]> | undefined;
  showAddLaPopup: boolean = false;
  showCreateLaInput: boolean = false;
  showLaSuccess: string = '';
  laName = '';

  constructor(
    private coursesService: CoursesService,
    private userService: UserService,
    private favoritesService: FavoritesService,
    private learningagreementService: LearningagreementService,
    ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.courses$ = this.coursesService.courses$;
    if (this.courses$) {
      this.courses$.subscribe((courses) => {
        courses.forEach((course) => {
          course.isDropdownOpen = false; // Initialisez la propriété isDropdownOpen pour chaque élément course
        });
      });
    }
    this.favorites$ = this.favoritesService.favorites$
    this.las$ = this.learningagreementService.las$;
    this.getStatus();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInsideDropdown = this.isClickInsideDropdown(event);
    if (!clickedInsideDropdown) {
      this.closeAllDropdowns();
    }
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

  toggleDropdown(courseId: string) {
    if (this.courses$) {
      this.courses$.subscribe((courses: any[]) => {
        courses.forEach((course: any) => {
          course.isDropdownOpen = course.id === courseId ? !course.isDropdownOpen : false;
        });
      });
    }
  }

  isClickInsideDropdown(event: MouseEvent): boolean {
    const elements = document.querySelectorAll('.dropdown, .dropdown-content');
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].contains(event.target as Node)) {
        return true;
      }
    }
    return false;
  }

  closeAllDropdowns(): void {
    if (this.courses$) {
      this.courses$.subscribe((courses: any[]) => {
        courses.forEach((course: any) => {
          course.isDropdownOpen = false;
        });
      });
    }
  }

  addToLa(laId: string, courseId : string): void {
    console.log(`adding course ${courseId} to la ${laId}`);
    this.learningagreementService.addToLa(laId, courseId).then(() => {
      this.closeAllDropdowns();
      if(!this.isCourseFavorited(courseId)){
        this.toggleFavorite(courseId);
      }
      this.showLaSuccess = "Course added successfully to the LA"
      this.showAddLaPopup = true;
      setTimeout(() => {
        this.showAddLaPopup = false;
        this.showLaSuccess = ""
      }, 2000);
    });
  }

  toggleCreateLaInput(): void {
    this.showCreateLaInput = !this.showCreateLaInput;
    if (!this.showCreateLaInput) {
      this.laName = '';
    }
  }

  createLaDocument(): void {
    if (this.laName.trim() !== '') {
      this.learningagreementService.createLaDocument(this.laName).then(() => {
        this.showCreateLaInput = false;
        this.showLaSuccess = `Successfully created LA ${this.laName}`
        this.showAddLaPopup = true;
        setTimeout(() => {
          this.showAddLaPopup = false;
          this.showLaSuccess = ""
        }, 2000);
      })
    }
  }
}
