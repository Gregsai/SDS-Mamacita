import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses-left-toolbar',
  templateUrl: './courses-left-toolbar.component.html',
  styleUrls: ['./courses-left-toolbar.component.css']
})
export class CoursesLeftToolbarComponent {
  isLoggedIn: boolean = false;
  constructor(
    private userService: UserService,
    ) {}

  ngOnInit(): void {
      this.isLoggedIn = this.userService.isLoggedIn();
  }
}
