import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, getDoc, deleteDoc, getDocs, DocumentData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LearningagreementService {

  private lasSubject = new BehaviorSubject<any[]>([]);
  las$: Observable<any[]> = this.lasSubject.asObservable();

  private laSubject = new BehaviorSubject<DocumentData | null>(null);
  la$: Observable<DocumentData | null> = this.laSubject.asObservable();

  private currentLaId: string | null = null;

  constructor(
    private userService: UserService,
    private firestore: Firestore) {
    this.updateLas();
    this.updateLa();
  }

  setCurrentLaId(currentLaId: string): void {
    this.currentLaId = currentLaId;
  }

  getCurrentLaId(): string | null {
    return this.currentLaId;
  }

  getlearningAgreements(): Observable<any[]> {
    const userId = this.userService.getUserId();

    if (!userId) {
      console.error('Could not find any user ids');
      return of([]);
    }

    const collectionName = `Lalisttest/${userId}/LearningAgreements`;

    return this.getCollectionData(collectionName);
  }

  updateLas(): void {
    this.getlearningAgreements().subscribe(LearningAgreements => {
      this.lasSubject.next(LearningAgreements);
    });
  }

  getlearningAgreement(): Observable<DocumentData | null> {
    const userId = this.userService.getUserId();

    if (!userId) {
      console.error('Could not find any user ids');
      return of(null);
    }

    const collectionName = `Lalisttest/${userId}/LearningAgreements`;

    if (this.currentLaId !== null) {
      return this.getDocument(collectionName, this.currentLaId);
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

  updateLa(): void {
    this.getlearningAgreement().subscribe((learningAgreement: DocumentData | null) => {
      console.log('Updated Learning Agreement:', learningAgreement);
      this.laSubject.next(learningAgreement);
    });
  }
  

  getCollectionData(collectionName: string): Observable<any[]> {
    return collectionData(collection(this.firestore, collectionName), { idField: 'id' });
  }


}
