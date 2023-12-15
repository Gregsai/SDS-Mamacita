import { Component } from '@angular/core';
import { CreatelaService } from 'src/app/services/createla.service';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { LearningagreementService } from 'src/app/services/learningagreement.service';

@Component({
  selector: 'app-createla',
  templateUrl: './createla.component.html',
  styleUrls: ['./createla.component.css'],
})
export class CreatelaComponent {
  isLoggedIn: boolean = false;
  currentLaId: string | null = null;

  constructor(private learningAgreementService: LearningagreementService, private userService: UserService) {}

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  isALaSelected(): Observable<boolean> {
    const currentLaId = this.learningAgreementService.getCurrentLaId();
    return of(currentLaId != null);
  }

}
