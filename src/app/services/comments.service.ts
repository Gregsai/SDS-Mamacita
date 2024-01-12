import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, query, setDoc, getDoc, deleteDoc, getDocs, DocumentData, where, addDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private firestore: Firestore,
    private coursesService: CoursesService,
  ) {

  }

  getCollectionData(collectionName: string): Observable<any[]> {
    return collectionData(collection(this.firestore, collectionName), { idField: 'id' });
  }



}
