import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../core/services/movies.service';
import {MoviesStoreService} from './store/movies.store.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  private loading;
  private _destroyed$ = new Subject<void>();

  constructor(private _moviesService: MoviesService, private _moviesStore: MoviesStoreService, private router: Router,
              private loadingController: LoadingController, private _translateService: TranslateService) {
  }

  ngOnInit() {
    this._moviesStore.getLoading().pipe(takeUntil(this._destroyed$)).subscribe(isLoading => {
      if (isLoading) {
        this.startLoading().then();
      } else {
        this.finishLoading().then();
      }
    });
    this.getAllDataFromServices();
  }

  getAllDataFromServices() {
    this._moviesStore.setLoading(true);
    this._moviesService.getMovies().subscribe(movies => {
      this._moviesStore.setAllMovies(movies);
    }, () => {}, () => {
      this._moviesService.getActors().subscribe(actors => {
        this._moviesStore.setAllActors(actors);
      }, () => {}, () => {
        this._moviesService.getCompanies().subscribe(companies => {
          this._moviesStore.setAllCompanies(companies);
        }, () => {}, () => {
          this._moviesStore.setLoading(false);
        });
      });
    });
  }

  openMovie(movie) {
    this.router.navigate(['movies/view-movie', movie.id]).then();
  }

  addMovie() {
    this.router.navigate(['movies/add-movie']).then();
  }

  async startLoading() {
    this.loading = await this.loadingController.create({
      message: this._translateService.instant('LOADING.MESSAGE')
    });
    await this.loading?.present();
  }

  async finishLoading() {
    await this.loading?.dismiss();
  }

}
