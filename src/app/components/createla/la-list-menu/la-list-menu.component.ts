import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { LearningagreementService } from 'src/app/services/learningagreement.service';

@Component({
  selector: 'app-la-list-menu',
  templateUrl: './la-list-menu.component.html',
  styleUrls: ['./la-list-menu.component.css']
})
export class LaListMenuComponent {
  isLoggedIn: boolean = false;
  las$: Observable<any[]> | undefined;

  constructor(
    private learningagreementService: LearningagreementService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.las$ = this.learningagreementService.las$;
  }
}
