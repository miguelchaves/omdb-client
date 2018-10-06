import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './login-view/login-view.component'
import { UserService } from './user.service';

const routes: Routes = [
  {
    path: '',
    component: LoginViewComponent,
    pathMatch: 'full',
    canActivate: [UserService],
    data: {
      title: 'Iniciar sesión',
      requireLogin: false
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
