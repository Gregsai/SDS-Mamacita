import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesSubject = new BehaviorSubject<any[]>([]); 
  courses$: Observable<any[]> = this.coursesSubject.asObservable();

  constructor(private firestore: Firestore) {
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
  updateCoursesWithFilters(filters: any): void {
    let queryRef = collection(this.firestore, 'courses') as any;
  
    if (filters.name) {
      queryRef = query(queryRef, where('name', '==', filters.name.toLowerCase()));
    }
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
      this.coursesSubject.next(filteredCourses);
    });
  }
  
}
