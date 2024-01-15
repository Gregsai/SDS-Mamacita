import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, query, setDoc, getDoc, deleteDoc, getDocs, DocumentData, where, addDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, from, forkJoin, EMPTY, throwError } from 'rxjs';
import { switchMap, catchError, mergeMap, toArray } from 'rxjs/operators';

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

  getActivityById(id: string): Observable<DocumentData | null> {
    const collectionName = `activities`;

    if (id !== null) {
      return this.getDocument(collectionName, id);
    } else {
      return of(null);
    }
  }

  private getDocument(collectionName: string, documentId: string): Observable<DocumentData | null> {
    const collectionRef = collection(this.firestore, collectionName);
    const documentRef = doc(collectionRef, documentId);

    return from(getDoc(documentRef)).pipe(
      switchMap(documentSnapshot => {
        if (documentSnapshot.exists()) {
          return of(documentSnapshot.data());
        } else {
          return of(null);
        }
      })
    );
  }
}
