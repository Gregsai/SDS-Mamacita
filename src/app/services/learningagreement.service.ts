import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, getDoc, deleteDoc, getDocs } from '@angular/fire/firestore';
import { BehaviorSubject, Observable , of} from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LearningagreementService {

  private lasSubject = new BehaviorSubject<any[]>([]);
  las$: Observable<any[]> = this.lasSubject.asObservable();

  constructor(
    private userService: UserService, 
    private firestore: Firestore) { 
        this.updateLas();
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

  getCollectionData(collectionName: string): Observable<any[]> {
    return collectionData(collection(this.firestore, collectionName), { idField: 'id' });
  }
}
