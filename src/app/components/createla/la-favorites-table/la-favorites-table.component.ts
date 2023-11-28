import { Component } from '@angular/core';
import { CreatelaService } from 'src/app/services/createla.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-la-favorites-table',
  templateUrl: './la-favorites-table.component.html',
  styleUrls: ['./la-favorites-table.component.css']
})
export class LaFavoritesTableComponent {
  tableLaFavorites: Observable<any[]> | undefined;

  constructor(private createlaService: CreatelaService) {}

  ngOnInit() {
    this.tableLaFavorites = this.createlaService.getCollectionData('tablelafavorites');
  }

  moveItemToTable1(item: any): void {
    this.createlaService.moveItemToTable('tablelafavorites', 'tablelacourses', item)
      .then(() => {
        // Additional logic after moving item to Table 1
      });
  }
}
