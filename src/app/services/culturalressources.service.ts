import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, query, setDoc, getDoc, deleteDoc, getDocs, DocumentData, where, addDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CulturalressourcesService {

  private activitiesSubject = new BehaviorSubject<any[]>([]);
  activities$: Observable<any[]> = this.activitiesSubject.asObservable();

  constructor(private firestore: Firestore) {
      this.updateActivities();
  }

  getActivities(): Observable<any[]> {
    const collectionName = `activities`;
    return this.getCollectionData(collectionName);
  }

  updateActivities(): void {
    this.getActivities().subscribe(Activities => {
      this.activitiesSubject.next(Activities);
    });
  }

  getCollectionData(collectionName: string): Observable<any[]> {
    return collectionData(collection(this.firestore, collectionName), { idField: 'id' });
  }
}
