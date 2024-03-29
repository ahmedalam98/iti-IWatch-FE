import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly URL_DB = 'https://iwatch.up.railway.app/movies/all';

  constructor(private readonly myClient: HttpClient) {}

  getAllMovies() {
    return this.myClient.get(this.URL_DB);
  }

  // (pipe & map) are both operators provided by the RxJS library for processing observable sequences.
  getMovieById(movieId: number) {
    return this.getAllMovies().pipe(
      map((movies: any) => movies.find((movie: any) => movie.id === movieId))
    );
  }
}
