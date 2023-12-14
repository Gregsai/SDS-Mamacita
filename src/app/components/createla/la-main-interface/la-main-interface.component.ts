import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { LearningagreementService } from 'src/app/services/learningagreement.service';

@Component({
  selector: 'app-la-main-interface',
  templateUrl: './la-main-interface.component.html',
  styleUrls: ['./la-main-interface.component.css']
})
export class LaMainInterfaceComponent {
  la$: Observable<DocumentData | null> | undefined;

  constructor(
    private learningagreementService: LearningagreementService
  ) { }

  ngOnInit(): void {
    this.la$ = this.learningagreementService.la$;
  }

}
