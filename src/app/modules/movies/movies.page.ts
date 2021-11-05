import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../core/services/movies.service';
import {MoviesStoreService} from './store/movies.store.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  constructor(private _moviesService: MoviesService, private _moviesStore: MoviesStoreService) {
  }

  ngOnInit() {
    this.getAllDataFromServices();
  }

  getAllDataFromServices() {
    this._moviesService.getMovies().subscribe(movies => {
      this._moviesStore.setAllMovies(movies);
    });
    this._moviesService.getActors().subscribe(actors => {
      this._moviesStore.setAllActors(actors);
    });
    this._moviesService.getCompanies().subscribe(companies => {
      this._moviesStore.setAllCompanies(companies);
    });
  }

}
