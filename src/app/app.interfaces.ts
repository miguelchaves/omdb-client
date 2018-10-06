export interface Film {
  Poster: String;
  Title: String;
  Type: String;
  Year: String;
  imdbID: String;
  isFavorite: Boolean;
}

export interface ResponseFilms {
  films: Array<Film>;
  totalResults: Number;
  showMore: Boolean;
}

export interface FilmDetails {
  Response: String;
  Title: String;
  Poster: String;
  Plot: String;
  Actors: String;
  Director: String;
  Genre: String;
  Year: String;
  imdbRating: String;
  Released: String;
  Website: String;
  Runtime: String;
}