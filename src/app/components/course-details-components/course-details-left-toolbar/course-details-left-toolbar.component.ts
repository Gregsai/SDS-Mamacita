import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';
import { FavoritesService } from '../../../services/favorites.service';
import { LearningagreementService } from '../../../services/learningagreement.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-course-details-left-toolbar',
  templateUrl: './course-details-left-toolbar.component.html',
  styleUrls: ['./course-details-left-toolbar.component.css']
})
export class CourseDetailsLeftToolbarComponent {
  courseId: string | null = null;
  courseDetails: any | null = null;
  showCreateLaInput: boolean = false;
  laName: string = '';
  las$: any;
  showAddLaPopup: boolean = false;
  showLaSuccess: string = '';
  isLoggedIn: boolean = false;
  status: string = '';
  showDropDown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private coursesService: CoursesService,
    private favoritesService: FavoritesService,
    private learningagreementService: LearningagreementService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      if (this.courseId) {
        this.fetchCourseDetails(this.courseId);
      }
    });
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

  getStatus(): void {
    if (this.isLoggedIn) {
      this.status = this.userService.getStatus();
    }
  }

  fetchCourseDetails(courseId: string): void {
    this.coursesService.getCourseById(courseId).subscribe(
      (courseData: any) => {
        this.courseDetails = courseData;
      },
      (error) => {
        console.error('Error fetching course details:', error);
      }
    );
  }

  isCourseFavorited(): boolean {
    let isFavorited = false;
    this.favoritesService.favorites$.subscribe((favoriteCourses: any[]) => {
      isFavorited = favoriteCourses.some(course => course.id === this.courseId);
    });
    return isFavorited;
  }

  toggleFavorite() {
    this.favoritesService.toggleCourseFavorite(this.courseId || '').then(() => {
      const button = document.querySelector(`button[data-course-id="${this.courseId}"]`);
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
    }).catch((error) => {
      console.error('Error toggling course favorite:', error);
    });
  }

  toggleDropdown() {
    this.showDropDown = !this.showDropDown;
  }

  toggleCreateLaInput() {
    this.showCreateLaInput = !this.showCreateLaInput;
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
    this.showCreateLaInput = false;
    this.showAddLaPopup = false;
    this.showDropDown = false;
  }

createLaDocument(): void {
  if (this.laName.trim() !== '') {
    this.learningagreementService.createLaDocument(this.laName).then(() => {
      this.showCreateLaInput = false;
      this.showLaSuccess = `Successfully created LA ${this.laName}`;
      this.showAddLaPopup = true;
      setTimeout(() => {
        this.showAddLaPopup = false;
        this.showLaSuccess = '';
      }, 2000);
    });
  }
}

  addToLa(laId: string): void {
    console.log(`adding course ${this.courseId} to la ${laId}`);
    this.learningagreementService.addToLa(laId, this.courseId || '').then(() => {
      this.closeAllDropdowns();
      if(!this.isCourseFavorited()){
        this.toggleFavorite();
      }
      this.showLaSuccess = "Course added successfully to the LA"
      this.showAddLaPopup = true;
      setTimeout(() => {
        this.showAddLaPopup = false;
        this.showLaSuccess = ""
      }, 2000);
    });
  }
}
