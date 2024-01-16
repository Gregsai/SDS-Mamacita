import { Routes,RouterLink, RouterOutlet } from '@angular/router';
import { CoursesComponent} from './components/courses/courses.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreatelaComponent } from './components/createla/createla.component';
import { CulturalRessourcesComponent } from './components/cultural-ressources/cultural-ressources.component';

const routeConfig: Routes = [
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'createla',
    component: CreatelaComponent,
  },
  {
    path: 'culturalressources',
    component: CulturalRessourcesComponent,
  },
];

export default routeConfig;
