import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../../shared/interfaces/movie';
import {Actor} from '../../shared/interfaces/actor';
import {Companies} from '../../shared/interfaces/companies';
import {environment} from '../../../environments/environment';

const url_base: string = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movie[]>(`${url_base}/movies`);
  }

  getMovieById(id: string) {
    return this.http.get<Movie>(`${url_base}/movies/${id}`);
  }

  addMovie(movie: Movie) {
    return this.http.post(`${url_base}/movies`, movie);
  }

  updateMovie(movie: Movie) {
    return this.http.put(`${url_base}/movies/${movie.id}`, movie);
  }

  deleteMovie(id: string) {
    return this.http.delete<Movie>(`${url_base}/movies/${id}`);
  }

  getActors() {
    return this.http.get<Actor[]>(`${url_base}/actors`);
  }

  getCompanies() {
    return this.http.get<Companies[]>(`${url_base}/companies`);
  }
}
