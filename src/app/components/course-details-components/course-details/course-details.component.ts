import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: string | null = null;
  courseDetails: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      if (this.courseId) {
        this.fetchCourseDetails(this.courseId);
      }
    });
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
}
