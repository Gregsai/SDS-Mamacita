import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details-comments',
  templateUrl: './course-details-comments.component.html',
  styleUrls: ['./course-details-comments.component.css']
})
export class CourseDetailsCommentsComponent implements OnInit {
  errorMessage: string = '';
  displayErrorMessage: boolean = false;
  userId: string | null = null;
  userEmail: string | null = null;
  courseId: string | null = null;
  displayMessage: boolean = false;
  message: string = '';
  comments: any[] = [];

  @ViewChild('commentContent') commentContent!: ElementRef;

  constructor(
    private commentsService: CommentsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getComments();
  }

  addComment(): void {
    if (!this.userService.isLoggedIn()) {
      this.errorMessage = 'You must be logged in to add a comment';
      this.displayErrorMessage = true;
      setTimeout(() => {
        this.displayErrorMessage = false;
        this.errorMessage = '';
      }, 5000);
      return;
    } else {
      this.userId = this.userService.getUserId();
      this.userEmail = this.userService.getEmail();
      const message = this.commentContent.nativeElement.innerText;

      if (!message.trim()) {
        this.errorMessage = 'Please enter a valid comment';
        this.displayErrorMessage = true;
        setTimeout(() => {
          this.displayErrorMessage = false;
          this.errorMessage = '';
        }, 5000);
        return;
      }

      if (this.courseId && this.userId) {
        this.commentsService.addComment(this.userId,this.userEmail, this.courseId, message).subscribe(
          () => {
            this.message = 'Comment successfully added';
            this.displayMessage = true;
            this.commentContent.nativeElement.innerText = '';
            setTimeout(() => {
              this.displayMessage = false;
              this.message = '';
            }, 5000);
            return;
          },
          error => {
            console.error('Error adding comment:', error);
            this.errorMessage = 'An error occurred while adding the comment';
            this.displayErrorMessage = true;
            setTimeout(() => {
              this.displayErrorMessage = false;
              this.errorMessage = '';
            }, 5000);
            return;
          }
        );
      }
    }
  }

  getComments(): void {
    if (this.courseId) {
      this.commentsService.getCommentsForCourse(this.courseId).subscribe(
        (comments: any[]) => {
          this.comments = comments;
        },
        error => {
          console.error('Error retrieving comments:', error);
        }
      );
    }
  }
}
