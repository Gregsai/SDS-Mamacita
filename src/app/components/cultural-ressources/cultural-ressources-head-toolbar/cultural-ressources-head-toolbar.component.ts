import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CulturalressourcesService } from 'src/app/services/culturalressources.service';

@Component({
  selector: 'app-cultural-ressources-head-toolbar',
  templateUrl: './cultural-ressources-head-toolbar.component.html',
  styleUrls: ['./cultural-ressources-head-toolbar.component.css']
})
export class CulturalRessourcesHeadToolbarComponent {
  newActivity: any = {};
  showPopup: boolean = false;
  status: string = '';
  isLoggedIn: boolean = false;

  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
    private userService: UserService,
    private culturalressourcesService: CulturalressourcesService
    ) {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      this.status = this.userService.getStatus();
    }
  }

  addActivity(newActivity: any) {
    const data = {
      name: newActivity.name,
      address: newActivity.address,
      description: newActivity.description,
      photoPath: newActivity.photoPath,
    };

    this.culturalressourcesService.addActivity(data).then(() => {
      this.closeModal.nativeElement.click();
      this.newActivity = {};
      this.showPopup = true;

      setTimeout(() => {
        this.showPopup = false;
      }, 5000);
    });
  }
}
