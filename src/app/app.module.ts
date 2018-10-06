import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Bootstrap Angular
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './user.service';
import { OmbdService } from './omdb.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { FilmsComponent } from './films/films.component';
import { FavoritesComponent } from './favorties/favorites.component';
import { HeaderComponent } from './header/header.component';
import { FilmDetailsComponent } from './film-details/film-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    FilmsComponent,
    FavoritesComponent,
    FilmDetailsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(), // Bootstrap
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [UserService, OmbdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
