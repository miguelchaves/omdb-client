import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './login-view/login-view.component'
import { UserService } from './user.service';
import { FilmsComponent } from './films/films.component';
import { FavoritesComponent } from './favorties/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: LoginViewComponent,
    pathMatch: 'full',
    canActivate: [UserService],
    data: {
      title: 'Sign in',
      requireLogin: false
    },
  },
  {
    path: 'films',
    component: FilmsComponent,
    pathMatch: 'full',
    canActivate: [UserService],
    data: {
      title: 'List of films',
      requireLogin: true
    },
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    pathMatch: 'full',
    canActivate: [UserService],
    data: {
      title: 'Favorites',
      requireLogin: true
    },
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
