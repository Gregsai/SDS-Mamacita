import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: string | null = null;
  courseDetails: any | null = null; // Variable pour stocker les détails du cours

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      if (this.courseId) {
        this.fetchCourseDetails(this.courseId); // Appel de la méthode pour obtenir les détails du cours
      }
    });
  }

  fetchCourseDetails(courseId: string): void {
    this.coursesService.getCourseById(courseId).subscribe(
      (courseData: any) => {
        this.courseDetails = courseData; // Stocker les détails du cours dans la variable
      },
      (error) => {
        console.error('Error fetching course details:', error);
      }
    );
  }
}
