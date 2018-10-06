import { Component, OnInit } from '@angular/core';
import { OmbdService } from '../omdb.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites: Array<any>;

  constructor (
    private omdbService: OmbdService
  ) {
    this.favorites = this.omdbService.getFavorites();
  }

  ngOnInit () {
    
  }

  removeFavorite (film) {
    this.omdbService.removeFavorite(film);
    this.favorites = this.omdbService.getFavorites();
  }
}
