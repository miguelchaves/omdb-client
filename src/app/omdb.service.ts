import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CONSTS } from './app.constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class OmbdService {

  private apiUrl = `http://www.omdbapi.com/?apikey=${CONSTS.omdbKey}&s=`;
  private stream: Observable<any>;
  private http: HttpClient;
  private favorites: Array<any> = [];
  private currentPage: 1;

  public currentSearchName: String = '';
  public currentSearch: Array<any> = [];
  public totalResults: Number = 0;
  public showMore: Boolean = false;
  
  constructor (
    http: HttpClient
  ) {
    this.http = http;
    const localFavorites = localStorage.getItem(CONSTS.storage.favorites);
    if (localFavorites) {
      this.favorites = JSON.parse(localFavorites);
    }
  }

  findFilms (name: String): Observable<any> {
    if (name.trim() === this.currentSearchName) {
      return of(this.formatResult());
    }
    this.currentSearchName = name.trim();
    this.currentPage = 1;
    return this.obtainFilms();
  }

  getMore (): Observable<any> {
    this.currentPage += 1;
    return this.obtainFilms();
  }

  obtainFilms (): Observable<any> {
    const url = `${this.apiUrl}${this.currentSearchName}&plot=full&page=${this.currentPage}`;
    const observable: Observable<any> = this.http.get(url);
    return observable.pipe(
      map(response => {
        const totalResults = parseInt(response.totalResults);
        if (response.Search.length > 0) {
          const newFilms = response.Search.map(film => {
            film.isFavorite = this.favorites.some(favorite => favorite.imdbID === film.imdbID);
            return film;
          });
          this.currentSearch = this.currentSearch.concat(response.Search);
          this.totalResults = totalResults;
          this.showMore = ((this.currentPage * 10) / totalResults) < 1;
        } else if (totalResults === 0) {
          this.currentSearch = [];
          this.totalResults = 0;
          this.showMore = false;
        }
        return this.formatResult();
      })
    );
  }

  private formatResult () {
    return {
      films: this.currentSearch,
      totalResults: this.totalResults,
      showMore: this.showMore
    };
  }

  getFavorites () {
    return this.favorites;
  }

  addFavorite (film) {
    this.favorites.push(film);
    this.saveFavorites();
  }

  removeFavorite (film) {
    film.isFavorite = false;
    this.favorites = this.favorites.filter(
      favorite => favorite.imdbID !== film.imdbID
    );
    this.saveFavorites();
  }

  private saveFavorites () {
    localStorage.setItem(CONSTS.storage.favorites, JSON.stringify(this.favorites));
  }
}