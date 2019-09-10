import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { StudentGuard } from '../services/rights/student.guard';
import { AuthGuard } from '../services/auth.guard';
import { AdminGuard } from '../services/rights/admin.guard';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
        canActivate: [StudentGuard]
      }, {
        path: 'administrator',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AdminGuard]
      }, {
        path: "**",
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
