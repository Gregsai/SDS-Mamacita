import { Routes,RouterLink, RouterOutlet } from '@angular/router';
import { CoursesComponent} from './components/courses/courses.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routeConfig: Routes = [
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
];

export default routeConfig;
