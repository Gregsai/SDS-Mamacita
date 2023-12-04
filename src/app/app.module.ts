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
import { LaCoursesTableComponent } from './components/createla/la-courses-table/la-courses-table.component';
import { LaFavoritesTableComponent } from './components/createla/la-favorites-table/la-favorites-table.component';

import { CoursesAddCourseComponent } from './components/courses-components/courses-head-toolbar/courses-add-course/courses-add-course.component';
import { CoursesGroupActionComponent } from './components/courses-components/courses-head-toolbar/courses-group-action/courses-group-action.component';
import { CoursesFilterComponent } from './components/courses-components/courses-left-toolbar/courses-filter/courses-filter.component';
import { CoursesFilterFavoritesComponent } from './components/courses-components/courses-left-toolbar/courses-filter-favorites/courses-filter-favorites.component';
import { CoursesListComponent } from './components/courses-components/courses-list/courses-list/courses-list.component';
import { CoursesHeadToolbarComponent } from './components/courses-components/courses-head-toolbar/courses-head-toolbar/courses-head-toolbar.component';
import { CoursesLeftToolbarComponent } from './components/courses-components/courses-left-toolbar/courses-left-toolbar/courses-left-toolbar.component';
import { CoursesService } from './services/courses.service';
import { UserComponent } from './components/user/user.component'; // Assurez-vous d'importer le service correctement

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HomePageComponent,
    CreatelaComponent,
    LaCoursesTableComponent,
    LaFavoritesTableComponent,
    CoursesAddCourseComponent,
    CoursesGroupActionComponent,
    CoursesFilterComponent,
    CoursesFilterFavoritesComponent,
    CoursesListComponent,
    CoursesHeadToolbarComponent,
    CoursesLeftToolbarComponent,

    CreatelaComponent,
    LaCoursesTableComponent,
    LaFavoritesTableComponent,
    CoursesAddCourseComponent,
    CoursesGroupActionComponent,
    CoursesFilterComponent,
    CoursesFilterFavoritesComponent,
    CoursesListComponent,
    CoursesHeadToolbarComponent,
    CoursesLeftToolbarComponent,

    CreatelaComponent,
    LaCoursesTableComponent,
    LaFavoritesTableComponent,
    CoursesAddCourseComponent,
    CoursesGroupActionComponent,
    CoursesFilterComponent,
    CoursesFilterFavoritesComponent,
    CoursesListComponent,
    CoursesHeadToolbarComponent,
    CoursesLeftToolbarComponent,
    UserComponent,
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
  providers: [
    CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
