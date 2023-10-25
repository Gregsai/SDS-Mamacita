import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
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
}