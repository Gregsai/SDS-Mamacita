import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import routeConfig from './routes';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { CoursesComponent } from './components/courses/courses.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { CreatelaComponent } from './components/createla/createla.component';
import { CoursesAddCourseComponent } from './components/courses-components/courses-head-toolbar/courses-add-course/courses-add-course.component';
import { CoursesGroupActionComponent } from './components/courses-components/courses-head-toolbar/courses-group-action/courses-group-action.component';
import { CoursesFilterComponent } from './components/courses-components/courses-left-toolbar/courses-filter/courses-filter.component';
import { CoursesFilterFavoritesComponent } from './components/courses-components/courses-left-toolbar/courses-filter-favorites/courses-filter-favorites.component';
import { CoursesListComponent } from './components/courses-components/courses-list/courses-list/courses-list.component';
import { CoursesBisComponent } from './components/courses-bis/courses-bis.component';
import { CoursesHeadToolbarComponent } from './components/courses-components/courses-head-toolbar/courses-head-toolbar/courses-head-toolbar.component';
import { CoursesLeftToolbarComponent } from './components/courses-components/courses-left-toolbar/courses-left-toolbar/courses-left-toolbar.component';
import { CoursesCartComponent } from './components/courses-components/courses-head-toolbar/courses-cart/courses-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HomePageComponent,
    CreatelaComponent,
    CoursesAddCourseComponent,
    CoursesGroupActionComponent,
    CoursesFilterComponent,
    CoursesFilterFavoritesComponent,
    CoursesListComponent,
    CoursesBisComponent,
    CoursesHeadToolbarComponent,
    CoursesLeftToolbarComponent,
    CoursesCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    RouterModule.forRoot(routeConfig),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
