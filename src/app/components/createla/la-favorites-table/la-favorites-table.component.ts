import { Component } from '@angular/core';
import { CreatelaService } from 'src/app/services/createla.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-la-favorites-table',
  templateUrl: './la-favorites-table.component.html',
  styleUrls: ['./la-favorites-table.component.css']
})
export class LaFavoritesTableComponent {
  /*//old functions
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
  //old functions
  */
  favoriteCourses$ = this.createlaService.getFavoritesTable();
  isLoggedIn: boolean = false;

  constructor(private createlaService: CreatelaService, private favoritesService: FavoritesService, private userService: UserService) {}

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
  }
  /////!!!!!!!!!DUPLICATE courses-list.component!!!!!!!!!!!!!!!!!!!!!!!
  toggleFavorite(courseId: string) {
    this.favoritesService.toggleCourseFavorite(courseId)
      .then(() => {
        const button = document.querySelector(`button[data-course-id="${courseId}"]`);
        if (button) {
          const img = button.querySelector('img');
          if (img) {
            const imgSrc = img.getAttribute('src');
            const newImgSrc = imgSrc === './../../assets/images/empty-heart.png'
              ? './../../assets/images/full-heart.png'
              : './../../assets/images/empty-heart.png';
            img.setAttribute('src', newImgSrc);
          }

        } 
      })
      .catch((error) => {
        // Manage error
      });
  }

   /////!!!!!!!!!DUPLICATE courses-list.component!!!!!!!!!!!!!!!!!!!!!!!
  isCourseFavorited(courseId: string): boolean {
    let isFavorited = false;

    this.favoritesService.favorites$.subscribe((favoriteCourses: any[]) => {
      isFavorited = favoriteCourses.some(course => course.id === courseId);
    });

    return isFavorited;
  }

}
