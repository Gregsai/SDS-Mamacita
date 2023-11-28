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


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HomePageComponent,
    CreatelaComponent,
    LaCoursesTableComponent,
    LaFavoritesTableComponent
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
