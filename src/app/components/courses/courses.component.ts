import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service'; // Le chemin relatif pour accéder au service
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<any[]> | undefined;
  newCourse: any = {};
  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    // Utilisez le service Firestore pour récupérer les données dans la méthode ngOnInit
    this.courses$ = this.coursesService.getCollectionData('courses');
  }
  addCourses(newCourse: any) {
    const data = {
      name: newCourse.name,
      faculty: newCourse.faculty,
      ects: newCourse.ects,
      language: newCourse.language,
      link: newCourse.link,
    };
    this.coursesService.addCourse(data).then(() => {
      this.newCourse = {};
    });;
  }
  // addCourses(data:object){
  //   this.coursesService.addCourse(data).then(() => {
  //     this.courses$ = this.coursesService.getCollectionData('courses');
  //   })
  // }

  // deleteCourses(id:string){
  //   this.coursesService.deleteCourse(id).then(() => {
  //     this.courses$ = this.coursesService.getCollectionData('courses');
  //   })
  // }
  deleteCourses(courseId: string) {
    this.coursesService.deleteCourse(courseId)
  }
}
