import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CONSTS } from './app.constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class OmbdService {

  private apiUrl = `http://www.omdbapi.com/?apikey=${CONSTS.omdbKey}`;
  private currentPage: 1;

  public currentSearchName: String = '';
  public favorites: Array<any>;
  public currentSearch: Array<any> = [];
  public totalResults: Number = 0;
  public showMore: Boolean = false;
  
  constructor (
    private http: HttpClient
  ) {
    const localFavorites = localStorage.getItem(CONSTS.storage.favorites);
    this.favorites = localFavorites ? JSON.parse(localFavorites) : [];
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
    const url = `${this.apiUrl}&s=${this.currentSearchName}&plot=full&page=${this.currentPage}`;
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

  addFavorite (film) {
    this.favorites.push(film);
    this.saveFavorites();
  }

  removeFavorite (film) {
    film.isFavorite = false;
    const isInList = this.currentSearch
      .find(filmInSearch => filmInSearch.imdbID === film.imdbID);
    if (isInList) {
      isInList.isFavorite = false;
    }
    this.favorites = this.favorites.filter(
      favorite => favorite.imdbID !== film.imdbID
    );
    this.saveFavorites();
  }

  private saveFavorites () {
    localStorage.setItem(CONSTS.storage.favorites, JSON.stringify(this.favorites));
  }

  /**
   * The info obtained in general searchs hasn't all info of the film.
   * Then, we obtain all info with the IMDB ID of the film
   * @param imdbID 
   */
  filmDetails (imdbID: String): Observable<any> {
    const url = `${this.apiUrl}&i=${imdbID}`;
    return this.http.get(url);
  }
}