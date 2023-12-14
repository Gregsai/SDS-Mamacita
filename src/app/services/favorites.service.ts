import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc, deleteDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable , of, combineLatest,forkJoin} from 'rxjs';
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
        const coursesInFavoritesTable = favoriteCourses.map((course: any) => course.id);

        const coursesInBoth = favorites.filter((fav: any) =>
          coursesInFavoritesTable.includes(fav.course)
        );

        const mergedCourses = coursesInBoth.map((fav: any) => {
          const foundCourse = favoriteCourses.find((course: any) => course.id === fav.course);
          return { ...fav, ...foundCourse };
        });

        return mergedCourses;
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
      map((favoriteCourses) => favoriteCourses.map((favCourse: any) => favCourse.course)),
      switchMap((favorites: any[]) => {
        if (favorites.length === 0) {
          return [];
        } else {
          return this.getCollectionData('courses').pipe(
            map((courses: any[]) => {
              console.log(courses.filter((course) => favorites.includes(course.id)));
              return courses.filter((course) => favorites.includes(course.id));
            })
          );
        }
      })
    );
  }
}
