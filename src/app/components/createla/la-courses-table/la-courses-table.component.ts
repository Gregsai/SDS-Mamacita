import { Component } from '@angular/core';
import { CreatelaService } from 'src/app/services/createla.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-la-courses-table',
  templateUrl: './la-courses-table.component.html',
  styleUrls: ['./la-courses-table.component.css']
})
export class LaCoursesTableComponent {
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
}
