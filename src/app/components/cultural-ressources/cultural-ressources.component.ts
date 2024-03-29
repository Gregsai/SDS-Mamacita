import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CulturalressourcesService } from 'src/app/services/culturalressources.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cultural-ressources',
  templateUrl: './cultural-ressources.component.html',
  styleUrls: ['./cultural-ressources.component.css']
})
export class CulturalRessourcesComponent {
  activities$: Observable<any[]> | undefined;
  isLoggedIn: boolean = false;

  constructor(
    private culturalressourcesService: CulturalressourcesService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.activities$ = this.culturalressourcesService.activities$;
    this.isLoggedIn = this.userService.isLoggedIn();
  }
}
