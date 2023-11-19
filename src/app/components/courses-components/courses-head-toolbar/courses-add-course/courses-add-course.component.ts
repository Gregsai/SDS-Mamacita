import { Component, ElementRef, ViewChild } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-add-course',
  templateUrl: './courses-add-course.component.html',
  styleUrls: ['./courses-add-course.component.css'],
})
export class CoursesAddCourseComponent {
  newCourse: any = {};
  showPopup: boolean = false;
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(private coursesService: CoursesService) {}

  addCourse(newCourse: any) {
    const data = {
      name: newCourse.name,
      faculty: newCourse.faculty,
      ects: newCourse.ects,
      language: newCourse.language,
      link: newCourse.link,
      semester: newCourse.semester,
      code: newCourse.code,
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
