import { Component, OnInit } from '@angular/core';
import { OmbdService } from '../omdb.service';
import { Film } from '../app.interfaces';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites: Array<Film>;

  constructor (
    private omdbService: OmbdService
  ) {
    this.favorites = this.omdbService.favorites;
  }

  ngOnInit () {
    
  }

  removeFavorite (film) {
    this.omdbService.removeFavorite(film);
    this.favorites = this.omdbService.favorites;
  }
}
