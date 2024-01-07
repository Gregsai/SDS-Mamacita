import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, query, setDoc, getDoc, deleteDoc, getDocs, DocumentData, where, addDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, from, forkJoin, EMPTY, throwError } from 'rxjs';
import { switchMap, catchError, mergeMap, toArray } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LearningagreementService {

  private lasSubject = new BehaviorSubject<any[]>([]);
  las$: Observable<any[]> = this.lasSubject.asObservable();

  private lacoursesSubject = new BehaviorSubject<any[]>([]);
  lacourses$: Observable<any[]> = this.lacoursesSubject.asObservable();

  private lacoursesListSubject = new BehaviorSubject<any[]>([]);
  lacourseslist$: Observable<any[]> = this.lacoursesListSubject.asObservable();

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

      this.updateLaCourses();
    });
  }

  getlearningAgreementCourses(laId: string | null): Observable<any[]> {
    const userId = this.userService.getUserId();

    if (!userId || laId === null || laId === undefined) {
      console.error('Invalid user ID or Learning Agreement ID');
      return of([]);
    }

    const collectionName = `Lalisttest/${userId}/LearningAgreements/${laId}/courses`;

    return this.getCollectionData(collectionName);
  }

  updateLaCourses(): void {
    this.getlearningAgreementCourses(this.currentLaId).subscribe(LearningAgreementCourses => {
      this.lacoursesSubject.next(LearningAgreementCourses);

      this.updateLaCoursesList();
    });
  }

  updateLaCoursesList(): void {
    this.lacourses$
      .pipe(
        switchMap(lacourses => {
          const courseIds = lacourses.map(course => course.course_id);

          if (courseIds.length === 0) {
            return of([]); // Empty array or Observable if there are no course_ids
          } else {
            // Fetch courses from Firestore based on course_id
            const coursesCollection = collection(this.firestore, 'courses');
            const queryz = query(coursesCollection, where('__name__', 'in', courseIds)); // Use '__name__' to filter by document ID
            return collectionData(queryz, { idField: 'id' });
          }
        })
      )
      .subscribe(coursesList => {
        this.lacoursesListSubject.next(coursesList);
      });
  }

  getCollectionData(collectionName: string): Observable<any[]> {
    return collectionData(collection(this.firestore, collectionName), { idField: 'id' });
  }

  async createLaCourseDocument(laId: string, courseId: string): Promise<void> {
    const userId = this.userService.getUserId();

    if (!userId) {
      console.error('User ID is null or undefined');
      // Handle the error or return early
      return;
    }
    if (!laId) {
      console.error('User ID is null or undefined');
      // Handle the error or return early
      return;
    }

    try {
      const userLaCourseRef = collection(this.firestore, 'Lalisttest', userId, 'LearningAgreements', laId, 'courses');
      const courseDocRef = doc(userLaCourseRef, courseId);

      await setDoc(courseDocRef, {
        user_id: userId,
        course_id: courseId
      });
      this.updateLa();
      console.log('La Course document successfully created');
    } catch (error) {
      console.error('Error occured whil creating La Course document', error);
      throw error;
    }
  }

  async removeLaCourseDocument(courseId: string): Promise<void> {
    const userId = this.userService.getUserId();

    if (!userId) {
      console.error('User ID is null or undefined');
      // Handle the error or return early
      return;
    }
    if (!this.currentLaId) {
      console.error('User ID is null or undefined');
      // Handle the error or return early
      return;
    }

    try {
      const userLaCourseRef = collection(this.firestore, 'Lalisttest', userId, 'LearningAgreements', this.currentLaId, 'courses');
      const courseDocRef = doc(userLaCourseRef, courseId);

      await deleteDoc(courseDocRef);
      this.updateLa();
      console.log('La Course document successfully deleted');
    } catch (error) {
      console.error('Error occured while removing La course', error);
      throw error;
    }
  }

  async createLaDocument(LaName: string): Promise<string | null> {
    const userId = this.userService.getUserId();

    if (!userId) {
      console.error('User ID is null or undefined');
      // Handle the error or return early
      return null;
    }

    try {
      const userLaRef = collection(this.firestore, 'Lalisttest', userId, 'LearningAgreements');

      // Use addDoc instead of setDoc
      const courseDocRef = await addDoc(userLaRef, {
        user_id: userId,
        la_id: '', // leave it empty for now
        name: LaName,
      });

      const laId = courseDocRef.id;

      // Set the la_id field with the document ID
      await updateDoc(courseDocRef, { la_id: laId });

      this.updateLa();
      console.log('La document successfully created with ID:', laId);

      return laId;
    } catch (error) {
      console.error('Error occurred while creating La document', error);
      throw error;
    }
  }


  async removeLaDocument(laId: string): Promise<void> {
    const userId = this.userService.getUserId();

    if (!userId) {
      console.error('User ID is null or undefined');
      // Handle the error or return early
      return;
    }

    try {
      const userLaRef = collection(this.firestore, 'Lalisttest', userId, 'LearningAgreements');
      const laDocRef = doc(userLaRef, laId);

      await deleteDoc(laDocRef);
      console.log('Learning Agreement document successfully removed');

      if (this.currentLaId == laId) {
        this.currentLaId = null;
      }
    } catch (error) {
      console.error('Error occurred while removing Learning Agreement document', error);
      throw error;
    }
  }

  async addToLa(laId: string, courseId: string): Promise<void> {
    const userId = this.userService.getUserId();

    if (!userId) {
      console.error('User ID is null or undefined');
      // Handle the error or return early
      return;
    }
    if (!laId) {
      console.error('laId is null or undefined');
      // Handle the error or return early
      return;
    }

    try {
      const userLaCourseRef = collection(this.firestore, 'Lalisttest', userId, 'LearningAgreements', laId, 'courses');
      const courseDocRef = doc(userLaCourseRef, courseId);

      await setDoc(courseDocRef, {
        user_id: userId,
        course_id: courseId
      });
      this.updateLa();
      console.log('La Course document successfully created');
    } catch (error) {
      console.error('Error occured whil creating La Course document', error);
      throw error;
    }
  }

  duplicateLa(originalLaId: string): void {
    const userId = this.userService.getUserId();

    if (!userId || !originalLaId) {
      console.error('User ID or originalLaId is null or undefined');
      // Handle the error or return early
      return;
    }

    let newLaId: string | null = null; // Use non-null assertion

    // Step 1: Get the original Learning Agreement data
    this.getDocument(`Lalisttest/${userId}/LearningAgreements`, originalLaId).pipe(
      switchMap((originalLaData) => {
        if (!originalLaData) {
          console.error('Original Learning Agreement not found');
          return EMPTY;
          // or throwError('Original Learning Agreement not found');
        }

        // Step 2: Create a new Learning Agreement document
        return this.createLaDocument(`Duplicate of ${originalLaData['name']}`);
      }),
      switchMap((createdLaId) => {
        if (createdLaId === null) {
          console.error('Created Learning Agreement ID is null');
          return EMPTY;
          // or throwError('Created Learning Agreement ID is null');
        }

        newLaId = createdLaId as string; // Type assertion

        // Step 3: Get the courses from the original Learning Agreement
        return this.getlearningAgreementCourses(originalLaId);
      }),
      catchError((error) => {
        console.error('Error getting original courses:', error);
        return throwError(error);
      })
    ).subscribe(
      (originalLaCourses) => {
        console.log('Original Learning Agreement Courses:', originalLaCourses);

        // Step 4: Duplicate each course to the new Learning Agreement
        const duplicateCoursePromises: Observable<void>[] = (originalLaCourses || []).map((course: any) => {
          return from(this.createLaCourseDocument(newLaId!, course.course_id));
        });

        // Step 5: Wait for all courses to be duplicated
        forkJoin(duplicateCoursePromises).subscribe(
          () => {
            console.log('Learning Agreement duplicated successfully');
          },
          (error) => {
            console.error('Error duplicating courses:', error);
          }
        );
      },
      (error) => {
        console.error('Error getting original courses:', error);
      }
    );
  }


}
