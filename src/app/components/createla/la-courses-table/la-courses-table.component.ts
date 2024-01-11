import { Component } from '@angular/core';
import { CreatelaService } from 'src/app/services/createla.service';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { LearningagreementService } from 'src/app/services/learningagreement.service';

@Component({
  selector: 'app-la-courses-table',
  templateUrl: './la-courses-table.component.html',
  styleUrls: ['./la-courses-table.component.css']
})
export class LaCoursesTableComponent {
  /*//old functions
  tableLaCourses: Observable<any[]> | undefined;

  constructor(private createlaService: CreatelaService) {}

  ngOnInit() {
    this.tableLaCourses = this.createlaService.getCollectionData('tablelacourses');
  }

  moveItemToTable2(item: any): void {
    this.createlaService.moveItemToTable('tablelacourses', 'tablelafavorites', item)
      .then(() => {
        // Additional logic after moving item to Table 2
      });
  }
  */
  lacourses$: Observable<any[]> | undefined;
  lacourseslist$: Observable<any[]> | undefined;

  constructor(
    private learningagreementService: LearningagreementService
  ) { }

  ngOnInit(): void {
    this.lacourses$ = this.learningagreementService.lacourses$;
    this.lacourseslist$ = this.learningagreementService.lacourseslist$;
  }

  removeLaCourseDocument(courseId: string) {
    this.learningagreementService.removeLaCourseDocument(courseId);
  }
  getTotalEcts(): number {
    let totalEcts = 0;
    this.lacourseslist$?.subscribe(courses => {
      totalEcts = courses.reduce((total, course) => total + course.ects, 0);
    });
    return totalEcts;
  }
}
