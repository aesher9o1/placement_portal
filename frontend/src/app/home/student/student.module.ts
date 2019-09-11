import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatToolbarModule
  ]
})
export class StudentModule { }
