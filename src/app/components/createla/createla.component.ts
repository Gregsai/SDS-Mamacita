import { Component } from '@angular/core';
import { CreatelaService } from 'src/app/services/createla.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createla',
  templateUrl: './createla.component.html',
  styleUrls: ['./createla.component.css'],
})
export class CreatelaComponent {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
  }
}
