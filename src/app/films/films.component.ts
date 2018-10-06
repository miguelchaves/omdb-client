import { Component, OnInit } from '@angular/core';
import { OmbdService } from '../omdb.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  films: Array<any> = [];
  results: 0;
  showMore: false;
  filmName: String = '';

  constructor (
    private omdbService: OmbdService
  ) { }

  ngOnInit () {
    
  }

  findFilms () {
    this.omdbService.findFilms(this.filmName).subscribe(
      response => {
        console.log('Response of films:', response);
        this.films = response.films;
        this.results = response.totalResults;
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
        this.results = response.totalResults;
        this.showMore = response.showMore;
      },
      err => {
        console.warn('Error to get films :', err);
        this.films = [];
      }
    );
  }
}
