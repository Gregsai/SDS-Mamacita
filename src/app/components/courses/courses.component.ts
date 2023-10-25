import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service'; // Le chemin relatif pour accéder au service
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<any[]> | undefined;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    // Utilisez le service Firestore pour récupérer les données dans la méthode ngOnInit
    this.courses$ = this.coursesService.getCollectionData('courses');
  }
}
