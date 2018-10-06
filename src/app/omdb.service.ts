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
  private currentSearch: Array<any> = [];
  private currentSearchName: String = '';
  private totalResults: Number;
  private showMore: Boolean = false;
  private currentPage: 1;

  constructor (
    http: HttpClient
  ) {
    this.http = http;
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
        if (response.Search.length > 0) {
          this.currentSearch = this.currentSearch.concat(response.Search);
          this.totalResults = response.totalResults;
          this.showMore = (this.currentPage * 10) / response.totalResults < 1;
        } else if (response.totalResults === 0) {
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
      total: this.totalResults,
      showMore: this.showMore
    };
  }

  getFavorites () {
  }

  setFavorite (film) {
  }

  removeFavorite (film) {
  }
}