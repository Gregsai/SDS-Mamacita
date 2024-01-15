import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CulturalressourcesService } from 'src/app/services/culturalressources.service';

@Component({
  selector: 'app-cultural-ressources-details-left-toolbar',
  templateUrl: './cultural-ressources-details-left-toolbar.component.html',
  styleUrls: ['./cultural-ressources-details-left-toolbar.component.css']
})
export class CulturalRessourcesDetailsLeftToolbarComponent {
  activityId: string | null = null;
  activityDetails: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private culturalressoucesService: CulturalressourcesService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.activityId = params.get('id');
      if (this.activityId) {
        this.fetchActivityDetails(this.activityId);
      }
    });
  }

  fetchActivityDetails(activityId: string): void {
    this.culturalressoucesService.getActivityById(activityId).subscribe(
      (activityData: any) => {
        this.activityDetails = activityData;
      },
      (error) => {
        console.error('Error fetching activity details:', error);
      }
    );
  }
}
