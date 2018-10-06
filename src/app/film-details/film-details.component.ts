import { Component, OnInit } from '@angular/core';
import { OmbdService } from '../omdb.service';
import { ActivatedRoute } from '@angular/router';
import { FilmDetails } from '../app.interfaces';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit {

  imdbID: string;
  film: FilmDetails|Boolean = undefined;

  constructor (
    private omdbService: OmbdService,
    activatedRoute: ActivatedRoute
  ) {
    this.imdbID = activatedRoute.snapshot.params.id;
  }

  ngOnInit () {
    this.omdbService.filmDetails(this.imdbID).subscribe(
      response => {
        console.log(response);
        this.film = response.Response.toLowerCase() === 'true'
          ? response
          : false;
      },
      err => {
        this.film = false;
      }
    )
  }
}
