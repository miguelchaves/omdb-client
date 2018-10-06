import { Component, OnInit } from '@angular/core';
import { OmbdService } from '../omdb.service';
import { Film } from '../app.interfaces';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  films: Array<Film>;
  totalResults: Number;
  showMore: Boolean;
  filmName: String;

  constructor (
    private omdbService: OmbdService
    
  ) {
    this.filmName = this.omdbService.currentSearchName;
    this.films = this.omdbService.currentSearch;
    this.totalResults = this.omdbService.totalResults;
    this.showMore = this.omdbService.showMore;
  }

  ngOnInit () {
    
  }

  findFilms () {
    this.omdbService.findFilms(this.filmName).subscribe(
      response => {
        console.log('Response of films:', response);
        this.films = response.films;
        this.totalResults = response.totalResults;
        this.showMore = response.showMore;
      },
      err => {
        console.warn('Error to get films :', err);
        this.films = [];
      }
    );
  }

  getMore () {
    this.omdbService.getMore().subscribe(
      response => {
        console.log('Response of films:', response);
        this.films = response.films;
        this.totalResults = response.totalResults;
        this.showMore = response.showMore;
      },
      err => {
        console.warn('Error to get films :', err);
        this.films = [];
      }
    );
  }

  toggleFavorite (film) {
    const wasFavorite = film.isFavorite;
    film.isFavorite = !wasFavorite;
    if (wasFavorite) {
      this.omdbService.removeFavorite(film);
    } else {
      this.omdbService.addFavorite(film);
    }
  }
}
