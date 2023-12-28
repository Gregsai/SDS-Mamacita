import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,take} from 'rxjs';
import { DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, where, DocumentSnapshot, getDoc } from '@angular/fire/firestore';
import { FavoritesService } from './favorites.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesSubject = new BehaviorSubject<any[]>([]);
  courses$: Observable<any[]> = this.coursesSubject.asObservable();

  constructor(
    private firestore: Firestore,
    private favoritesService: FavoritesService) {
    this.updateCourses();
  }

  getCollectionData(collectionName: string): Observable<any[]> {
    return collectionData(collection(this.firestore, collectionName), { idField: 'id'});
  }

  updateCourses(): void {
    this.getCollectionData('courses').subscribe(courses => {
      this.coursesSubject.next(courses);
    });
  }

  addCourse(data: object): Promise<DocumentReference<object>> {
    return addDoc(collection(this.firestore, 'courses'), data);
  }

  deleteCourse(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'courses/' + id);
    return deleteDoc(docRef);
  }

  getCourseById(id: string): Observable<any> {
    const docRef = doc(this.firestore, 'courses/' + id);
    return new Observable<any>((observer) => {
      getDoc(docRef).then((snapshot: DocumentSnapshot<any>) => {
        const courseData = snapshot.data();
        observer.next(courseData);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  updateCoursesWithFilters(filters: any): void {
    let queryRef = collection(this.firestore, 'courses') as any;

    if (filters.faculty) {
      queryRef = query(queryRef, where('faculty', '==', filters.faculty.toLowerCase()));
    }
    if (filters.semester) {
      queryRef = query(queryRef, where('semester', '==', filters.semester));
    }
    if (filters.ects) {
      queryRef = query(queryRef, where('ects', '==', filters.ects));
    }
    if (filters.language) {
      queryRef = query(queryRef, where('language', '==', filters.language.toLowerCase()));
    }

    collectionData(queryRef, { idField: 'id'}).subscribe(filteredCourses => {
      if (filters.name) {
        const searchTerm = filters.name.toLowerCase();
        filteredCourses = filteredCourses.filter(course => course['name'].toLowerCase().includes(searchTerm));
      }
      this.coursesSubject.next(filteredCourses);
    });
  }

  updateCoursesWithFavorites(showFavoritesOnly: boolean): void {
    if (showFavoritesOnly) {
      this.favoritesService.getFavoriteCourses().subscribe((favoriteCourses) => {
        const favoriteCourseIds = favoriteCourses.map((favCourse: any) => favCourse.course);
        this.coursesSubject.pipe(take(1)).subscribe((courses) => {
          const filteredCourses = courses.filter((course) => favoriteCourseIds.includes(course.id));
          this.coursesSubject.next(filteredCourses);
        });
      });
    } else {
      this.updateCourses();
    }
  }

}
