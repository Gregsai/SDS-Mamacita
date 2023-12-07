import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FavoritesService } from './favorites.service';


@Injectable({
  providedIn: 'root',
})
export class CreatelaService {

  constructor(private firestore: Firestore, private favoritesService: FavoritesService) {}

  getCollectionData(collectionName: string): Observable<any[]> {
    return collectionData(collection(this.firestore, collectionName), { idField: 'id' });
  }
  //new functions

  //create La
  //get LA id
  //get courses from la
  //add courses to LA
  //get list of LA
  //remove course from LA
  //remove course from favorites courses
  
  //Get favorites table
  //recupère la liste des cours favoris

  getFavoritesTable(): Observable<any[]> {
    return this.favoritesService.getFavoriteCourses().pipe(
      map((favoriteCourses) => {
        const favoriteCourseIds = favoriteCourses.map((favCourse: any) => favCourse.course);
        return favoriteCourseIds;
      }),
      switchMap((ids) => {
        if (ids.length === 0) {
          return of([]); // Empty array or Observable if no favorite course IDs
        } else {
          // Use getCollectionData to retrieve courses based on IDs
          return this.getCollectionData('courses').pipe(
            map((courses: any[]) => {
              return courses.filter((course) => ids.includes(course.id));
            })
          );
        }
      })
    );
  }



  //old functions
  
  /*
  moveItemToTable(source: string, destination: string, item: any): Promise<void> {
    const sourceDocRef = doc(this.firestore, `${source}/${item.id}`);
    return this.deleteDocument(source, item.id) // Delete from source
      .then(() => this.addDocument(destination, item)) // Add to destination
      .then(() => undefined); // Ensure the final return type is Promise<void>
  }

  copyItemToTable(source: string, destination: string, item: any): Promise<void> {
    const sourceDocRef = doc(this.firestore, `${source}/${item.id}`);
    return this.addDocument(destination, item) // Add to destination
      .then(() => undefined); // Ensure the final return type is Promise<void>
  }
  

  addDocument(collectionName: string, data: object): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(this.firestore, collectionName), data);
  }

  deleteDocument(collectionName: string, id: string): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return deleteDoc(docRef);
  }
  */
  //end of old functions 



}
