import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, Timestamp, getDocs, query, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
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
  ) { }

  addComment(userId: string, userEmail: string, courseId: string, message: string): Observable<void> {
    const commentData = {
      authorId: userId,
      authorEmail: userEmail,
      courseId: courseId,
      date: Timestamp.now(),
      message: message
    };

    const commentCollection = collection(this.firestore, `comments/${courseId}/course_comments`);

    return from(setDoc(doc(commentCollection), commentData));
  }

  getCommentsForCourse(courseId: string): Observable<any[]> {
    const commentCollection = collection(this.firestore, `comments/${courseId}/course_comments`);
    const commentsQuery = query(commentCollection);

    return new Observable((observer) => {
      const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
        const comments: any[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const comment = {
            authorId: data['authorId'],
            authorEmail: data['authorEmail'],
            courseId: data['courseId'],
            timestamp: data['date'].toDate().getTime(),
            date: data['date'].toDate().toLocaleDateString(),
            time: data['date'].toDate().toLocaleTimeString(),
            message: data['message']
          };
          comments.push(comment);
        });

        comments.sort((a, b) => a.timestamp - b.timestamp);
        observer.next(comments);
      });

      return () => unsubscribe();
    });
  }
}
