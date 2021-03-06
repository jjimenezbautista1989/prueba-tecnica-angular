import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieForm} from '../../interfaces/movie-form';
import {Companies} from '../../../../shared/interfaces/companies';
import {Subject, zip} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../../../../core/services/movies.service';
import {takeUntil} from 'rxjs/operators';
import {MoviesStoreService} from '../../store/movies.store.service';
import {Actor} from '../../../../shared/interfaces/actor';
import {Movie} from '../../../../shared/interfaces/movie';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss'],
})
export class MovieViewComponent implements OnInit, OnDestroy {


  movie: MovieForm;
  title: string;
  arrayActorsName: Array<string> = [];
  arrayCompanies: Companies[] = [];
  arrayMovies: Movie[] = [];

  private _destroyed$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private _moviesService: MoviesService,
              private _moviesStore: MoviesStoreService, private router: Router) { }

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.params.id;
    if (id) {
      this._moviesStore.setLoading(true);
      this._moviesService.getMovieById(id).subscribe(movie => {
        this.movie = movie;
        this.title = this.movie.title;
        this._moviesStore.setLoading(false);
        this.initView();
      }, () => {
        this.goBack();
      });
    } else {
      this.goBack();
    }
  }

  initView() {
    zip(this._moviesStore.getAllActors(), this._moviesStore.getAllCompanies(), this._moviesStore.getAllMovies())
      .pipe(takeUntil(this._destroyed$))
      .subscribe(([actors, companies, movies]) => {
        if (!actors && !companies && !movies) {
          this.goBack();
        } else {
          if (actors) {
            for (const actorId of this.movie.actors) {
              const actor: Actor = actors.find(a => a.id === actorId);
              this.arrayActorsName.push(actor.first_name.concat(' ').concat(actor.last_name));
            }
          }
          if (companies) {this.arrayCompanies = [...companies];}
          if (movies) {this.arrayMovies = [...movies];}
        }
      });
  }

  getCompaniesName(id) {
    const companies = this.arrayCompanies?.find(s => s.id === id);
    return companies?.name;
  }

  goBack() {
    this.router.navigate(['movies']);
  }

  editMovie() {
    this.router.navigate(['movies/edit-movie', this.movie.id]).then();
  }

  deleteMovie() {
    this._moviesStore.setLoading(true);
    this._moviesService.deleteMovie(this.movie.id.toString()).subscribe(() => {
      this._moviesStore.setAllMovies(this.arrayMovies.filter(m => m.id !== this.movie.id));
    }, () => {}, () => {
      this._moviesStore.setLoading(false);
      this.goBack();
    });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}
