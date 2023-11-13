import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { CoursesService } from '../../services/courses.service'; // Le chemin relatif pour accéder au service
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef
  courses$: Observable<any[]> | undefined;
  newCourse: any = {};
  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    // Utilisez le service Firestore pour récupérer les données dans la méthode ngOnInit
    this.courses$ = this.coursesService.getCollectionData('courses');
  }
  addCourses(newCourse: any) {
    if(window.confirm('Are sure you want to add this course ?')){
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
        this.newCourse = {};
        this.closeModal.nativeElement.click();
      });;


    }
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
