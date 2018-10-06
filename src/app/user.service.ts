import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { CanActivate }    from '@angular/router';
import { CONSTS } from './app.constants';
import { Router } from '@angular/router';

@Injectable()
export class UserService implements CanActivate {

  constructor (private router: Router) { }

  /**
   * Mock of users with email, password and name
   */
  private USERS = [
    {
      email: 'prueba',
      password: 'prueba',
      name: 'Prueba'
    }
  ];

  login (email: String, password: String) {
    const userLogged = this.USERS
      .find(user => user.email === email && user.password === password);

    if (userLogged) {
      sessionStorage.setItem(CONSTS.storage.user, JSON.stringify(userLogged));
      return of(userLogged);
    }
    return throwError('Usuario o contraseña incorrectos');
  }

  logout () {
    sessionStorage.removeItem(CONSTS.storage.user);
    this.router.navigateByUrl(''); // Go To Login
  }

  isLogged () {
    return sessionStorage.getItem(CONSTS.storage.user);
  }

  canActivate (route) {
    const isLogged = this.isLogged();
    if (!isLogged && route.data.requireLogin) {
      this.router.navigateByUrl(''); // Go To Login
      return false;
    }
    if (isLogged && route.data.requireLogin === false) {
      this.router.navigateByUrl('films'); // Go To Home Logged
      return false;
    }
    return true;
  }
}
