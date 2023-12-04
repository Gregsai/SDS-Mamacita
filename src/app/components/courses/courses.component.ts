import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,) {}

    ngOnInit(): void {
      this.isLoggedIn = this.userService.isLoggedIn();
  }
}
