import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Movie} from '../../../shared/interfaces/movie';
import {Actor} from '../../../shared/interfaces/actor';
import {Companies} from '../../../shared/interfaces/companies';

@Injectable({
  providedIn: 'root'
})
export class MoviesStoreService {

  public loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public allMovies: BehaviorSubject<Movie[]> = new BehaviorSubject(undefined);
  public allActors: BehaviorSubject<Actor[]> = new BehaviorSubject(undefined);
  public allCompanies: BehaviorSubject<Companies[]> = new BehaviorSubject(undefined);

  constructor() { }

  public getLoading() {
    return this.loading.asObservable();
  }

  public getAllMovies() {
    return this.allMovies.asObservable();
  }

  public getAllActors() {
    return this.allActors.asObservable();
  }

  public getAllCompanies() {
    return this.allCompanies.asObservable();
  }

  public setLoading(loading: boolean) {
    this.loading.next(loading);
  }

  public setAllMovies(movies: Movie[]) {
    this.allMovies.next(movies);
  }

  public setAllActors(actors: Actor[]) {
    this.allActors.next(actors);
  }

  public setAllCompanies(companies: Companies[]) {
    this.allCompanies.next(companies);
  }
}
