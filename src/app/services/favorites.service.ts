import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc, deleteDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable , of, combineLatest} from 'rxjs';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<any[]>([]);
  favorites$: Observable<any[]> = this.favoritesSubject.asObservable();
  favoritesList$: Observable<any[]>;

  constructor(
    private userService: UserService,
    private firestore: Firestore
  ) {
    this.updateFavorites();
    this.favoritesList$ = combineLatest([this.favoritesSubject, this.getFavoritesTable()]).pipe(
      map(([favorites, favoriteCourses]) => {
        // Combine or manipulate the favorites and favoriteCourses as needed
        const mergedFavorites = favorites.map((fav: any) => {
          const foundCourse = favoriteCourses.find((course: any) => course.id === fav.course);
          return { ...fav, ...foundCourse };
        });
        return mergedFavorites;
      })
    );
  }

  updateFavorites(): void {
    this.getFavoriteCourses().subscribe(
      (favoriteCourses: any[]) => {
        this.favoritesSubject.next(favoriteCourses);
      },
      (error) => {
        console.error('Error occured while updating favourites', error);
      }
    );
  }

  getFavoriteCourses(): Observable<any[]> {
    const userId = this.userService.getUserId();
    if (userId) {
      const userFavoritesRef = collection(this.firestore, 'favorites', userId, 'courses');
      return new Observable<any[]>((observer) => {
        getDocs(userFavoritesRef).then((querySnapshot) => {
          const favoriteCourses: any[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          observer.next(favoriteCourses);
          observer.complete();
        }).catch((error) => {
          observer.error(error);
        });
      });
    } else {
      console.error('Could not find any user ids');
      return of([]);
    }
  }

  async createFavoriteDocument(userId: string, courseId: string): Promise<void> {
    try {
      const userFavoritesRef = collection(this.firestore, 'favorites', userId, 'courses');
      const courseDocRef = doc(userFavoritesRef, courseId);

      await setDoc(courseDocRef, {
        user: userId,
        course: courseId
      });
      console.log('Favorite document successfully created');
    } catch (error) {
      console.error('Error occured whil creating Favorite document', error);
      throw error;
    }
  }

  async removeCourseFromFavorites(userId: string, courseId: string): Promise<void> {
    try {
      const userFavoritesRef = collection(this.firestore, 'favorites', userId, 'courses');
      const courseDocRef = doc(userFavoritesRef, courseId);

      await deleteDoc(courseDocRef);
    } catch (error) {
      console.error('Error occured while removing favourite course', error);
      throw error;
    }
  }

  async checkCourseFavorited(userId: string, courseId: string): Promise<boolean> {
    try {
      const userFavoritesRef = collection(this.firestore, 'favorites', userId, 'courses');
      const courseDocRef = doc(userFavoritesRef, courseId);
      const courseDoc = await getDoc(courseDocRef);

      return courseDoc.exists();
    } catch (error) {
      console.error('Error while checking if favourite course :', error);
      throw error;
    }
  }

  async toggleCourseFavorite(courseId: string): Promise<void> {
    const userId = this.userService.getUserId();

    if (userId) {
      const isCourseFavorited = await this.checkCourseFavorited(userId, courseId);

      if (isCourseFavorited) {
        await this.removeCourseFromFavorites(userId, courseId);
        console.log('Course successfully removed from favorites.');
      } else {
        await this.createFavoriteDocument(userId, courseId);
        console.log('Course successfully added in favorites.');
      }

      this.updateFavorites();
    } else {
      console.error('User id could not be found');
    }
  }

  getCollectionData(collectionName: string): Observable<any[]> {
    return collectionData(collection(this.firestore, collectionName), { idField: 'id' });
  }
  getFavoritesTable(): Observable<any[]> {
    return this.getFavoriteCourses().pipe(
      map((favoriteCourses) => {
        const favoriteCourseIds = favoriteCourses.map((favCourse: any) => favCourse.course);
        return favoriteCourseIds;
      }),
      switchMap((ids) => {
        if (ids.length === 0) {
          return of([]); // Tableau vide ou Observable s'il n'y a pas d'identifiants de cours favoris
        } else {
          // Utilisation de getCollectionData pour récupérer les cours en fonction des identifiants
          return this.getCollectionData('courses').pipe(
            map((courses: any[]) => {
              return courses.filter((course) => ids.includes(course.id));
            })
          );
        }
      })
    );
  }
}
