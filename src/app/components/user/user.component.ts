import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  showSignUp: boolean = false;
  email: string = '';
  password: string = '';
  status: string = '';
  userLoggedIn: boolean = false;
  signUpError: string = '';
  signInError: string = '';

  constructor(
    private userService: UserService,
    private router: Router
    ) {

    }

    ngOnInit(): void {
      this.checkUserLoggedIn();
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkUserLoggedIn(); // Check if the user session is still valid
      });
    }

    checkUserLoggedIn(): void {
      this.userLoggedIn = this.userService.isLoggedIn();
    }

    private validateEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    private validatePassword(password: string): boolean {
      return password.length >= 4;
    }

    toggleSignUp(): void {
      this.showSignUp = !this.showSignUp;
      this.signUpError = '';
      this.signInError = '';
    }

    async signIn(): Promise<void> {
      const email = this.email;
      const password = this.password;

      if (!this.validateEmail(email)) {
        this.signInError = 'Please, enter a valid email (eg : john@doe.com))';
        return;
      }

      if (!this.validatePassword(password)) {
        this.signInError = 'Your password needs to be at least 4 characters long';
        return;
      }

      try {
        const isLoggedIn: boolean = await this.userService.signIn(email, password);

        if (isLoggedIn) {
          console.log('User logged in successfully');
          this.signInError = '';
        } else {
          console.log('Connexion failed');
          this.signInError = 'Incorrect email or password';
        }

        this.checkUserLoggedIn();
      } catch (error) {
        console.error('Connexion failed : ', error);
        this.signInError = 'Connexion failed';
        this.checkUserLoggedIn();
      }
    }

    async signUp(): Promise<void> {
      const email = this.email;
      const password = this.password;
      const status = this.status;

      if (!this.validateEmail(email)) {
        this.signUpError = 'Please, enter a valid email (eg : john@doe.com))';
        return;
      }

      if (!this.validatePassword(password)) {
        this.signUpError = 'Your password needs to be at least 4 characters long';
        return;
      }
      if (this.status.trim() === '') {
        this.signUpError = 'Please select a status';
        return;
      }

      try {
        await this.userService.signUp(email, password, status);
        console.log('User successfully signed up');
        this.signUpError = '';
      } catch (error: any) {
        console.error("Sign up Error : ", error);
        this.signUpError = error.toString();
      }
    }

    signOut(): void {
      this.userService.signOut();
      this.checkUserLoggedIn();
    }
}
