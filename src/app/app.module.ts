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
import { UserComponent } from './components/user/user.component';
import { LaListMenuComponent } from './components/createla/la-list-menu/la-list-menu.component';
import { LaMainInterfaceComponent } from './components/createla/la-main-interface/la-main-interface.component';
import { CourseDetailsComponent } from './components/course-details-components/course-details/course-details.component';
import { CourseDetailsLeftToolbarComponent } from './components/course-details-components/course-details-left-toolbar/course-details-left-toolbar.component';
import { CourseDetailsCommentsComponent } from './components/course-details-components/course-details-comments/course-details-comments.component'; // Assurez-vous d'importer le service correctement
import { CulturalRessourcesComponent } from './components/cultural-ressources/cultural-ressources.component';
import { CulturalRessourcesDetailsComponent } from './components/cultural-ressources/cultural-ressources-details/cultural-ressources-details.component';
import { CulturalRessourcesDetailsLeftToolbarComponent } from './components/cultural-ressources/cultural-ressources-details/cultural-ressources-details-left-toolbar/cultural-ressources-details-left-toolbar.component';
import { CulturalRessourcesDetailsCommentsComponent } from './components/cultural-ressources/cultural-ressources-details/cultural-ressources-details-comments/cultural-ressources-details-comments.component';
import { CulturalRessourcesMainContentComponent } from './components/cultural-ressources/cultural-ressources-main-content/cultural-ressources-main-content.component';
import { CulturalRessourcesHeadToolbarComponent } from './components/cultural-ressources/cultural-ressources-head-toolbar/cultural-ressources-head-toolbar.component'; // Assurez-vous d'importer le service correctement

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
    LaListMenuComponent,
    LaMainInterfaceComponent,
    CourseDetailsComponent,
    CourseDetailsLeftToolbarComponent,
    CourseDetailsCommentsComponent,
    CulturalRessourcesComponent,
    CulturalRessourcesDetailsComponent,
    CulturalRessourcesDetailsLeftToolbarComponent,
    CulturalRessourcesDetailsCommentsComponent,
    CulturalRessourcesMainContentComponent,
    CulturalRessourcesHeadToolbarComponent,
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
