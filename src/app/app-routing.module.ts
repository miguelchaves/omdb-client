import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './login-view/login-view.component'

const routes: Routes = [
  {
    path: '',
    component: LoginViewComponent,
    pathMatch: 'full',
    data: {
      title: 'Iniciar sesión'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
