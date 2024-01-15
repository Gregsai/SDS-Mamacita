import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './components/course-details-components/course-details/course-details.component';
import { CulturalRessourcesDetailsComponent } from './components/cultural-ressources/cultural-ressources-details/cultural-ressources-details.component';

const routes: Routes = [
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'culturalressources/:id', component: CulturalRessourcesDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
