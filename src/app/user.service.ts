import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { CanActivate }    from '@angular/router';
import { CONSTS } from './app.constants';

@Injectable()
export class UserService implements CanActivate {

  /**
   * Mock of users with email, password and name
   */
  USERS = [
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

  isLogged () {
    return sessionStorage.getItem(CONSTS.storage.user);
  }

  canActivate (route) {
    if (route.data.requireLogin === true) {
      return Boolean(this.isLogged());
    } else if (route.data.requireLogin === false) {
      return !this.isLogged();
    }
    return true;
  }
}
