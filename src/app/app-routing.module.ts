import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './login-view/login-view.component'
import { UserService } from './user.service';
import { FilmsComponent } from './films/films.component';

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
  },
  {
    path: 'films',
    component: FilmsComponent,
    pathMatch: 'full',
    canActivate: [UserService],
    data: {
      title: 'Listado de películas',
      requireLogin: true
    },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
