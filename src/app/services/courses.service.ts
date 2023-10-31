import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData,deleteDoc,doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private firestore: Firestore) {}

  getCollectionData(collectionName: string): Observable<any[]> {
    const aCollection = collection(this.firestore, collectionName);
    return collectionData(aCollection);
  }

  addCourse(data:object){
    let bool = addDoc(collection(this.firestore, 'courses'), data)
    return bool
  }

  deleteCourse(id:string){
    let docRef = doc(this.firestore, 'courses/' + id)
    return deleteDoc(docRef)
  }
}