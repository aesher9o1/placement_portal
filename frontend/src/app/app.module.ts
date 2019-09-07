import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { SummaryComponent } from './resumePages/summary/summary.component';
import { PersonalInfoComponent } from './resumePages/personal-info/personal-info.component';
import { ExperienceComponent } from './resumePages/experience/experience.component';
import { ProjectsComponent } from './resumePages/projects/projects.component';
import { EducationComponent } from './resumePages/education/education.component';
import { SkillsComponent } from './resumePages/skills/skills.component';
import { DownloadComponent } from './resumePages/download/download.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';






@NgModule({
  declarations: [AppComponent, ResumeBuilderComponent, SummaryComponent, PersonalInfoComponent, ExperienceComponent, ProjectsComponent, EducationComponent, SkillsComponent, DownloadComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
