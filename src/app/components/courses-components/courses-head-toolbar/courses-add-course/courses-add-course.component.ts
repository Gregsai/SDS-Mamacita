import { Component, ElementRef, ViewChild } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses-add-course',
  templateUrl: './courses-add-course.component.html',
  styleUrls: ['./courses-add-course.component.css'],
})
export class CoursesAddCourseComponent {
  newCourse: any = {};
  showPopup: boolean = false;
  status: string = '';
  isLoggedIn: boolean = false;

  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
    private coursesService: CoursesService,
    private userService: UserService
    ) {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      this.status = this.userService.getStatus();
    }
  }

  addCourse(newCourse: any) {
    const data = {
      name: newCourse.name.toLowerCase(),
      faculty: newCourse.faculty.toLowerCase(),
      ects: newCourse.ects,
      language: newCourse.language.toLowerCase(),
      link: newCourse.link,
      semester: newCourse.semester,
      code: newCourse.code.toLowerCase(),
    };

    this.coursesService.addCourse(data).then(() => {
      this.closeModal.nativeElement.click();
      this.newCourse = {};
      this.showPopup = true;

      setTimeout(() => {
        this.showPopup = false;
      }, 5000);
    });
  }
}
