import { Component , ViewChild, ElementRef} from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { LearningagreementService } from 'src/app/services/learningagreement.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-la-list-menu',
  templateUrl: './la-list-menu.component.html',
  styleUrls: ['./la-list-menu.component.css']
})
export class LaListMenuComponent {
  isLoggedIn: boolean = false;
  las$: Observable<any[]> | undefined;
  showInput = false;
  laName = '';
  @ViewChild('laInput') laInput!: ElementRef; // ViewChild pour l'input

  constructor(
    private learningagreementService: LearningagreementService,
    private userService: UserService,
    private favoriteservice: FavoritesService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.las$ = this.learningagreementService.las$;
  }

  chooseCurrentLa(LaId: string): void {
    this.learningagreementService.setCurrentLaId(LaId);
    this.learningagreementService.updateLa();
  }

  toggleInput(): void {
    this.showInput = !this.showInput;
    if (this.showInput) {
      setTimeout(() => {
        this.laInput.nativeElement.focus();
      }, 0);
    } else {
      this.laName = '';
    }
  }

  createLaDocument(): void {
    if (this.laName.trim() !== '') {
      this.learningagreementService.createLaDocument(this.laName);
      this.showInput = false;
      this.laName = ''; // Reset the input field after creating La document
    }
  }

  removeLa(laId: string): void {
    this.learningagreementService.removeLaDocument(laId)
      .then(() => {
      })
      .catch(error => {
        // Handle errors
        console.error('Error while removing Learning Agreement document', error);
      });
  }
}
