import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MovieForm} from '../../interfaces/movie-form';
import {Actor} from '../../../../shared/interfaces/actor';
import {Companies} from '../../../../shared/interfaces/companies';
import {Movie} from '../../../../shared/interfaces/movie';
import {Subject, zip} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../../../../core/services/movies.service';
import {TranslateService} from '@ngx-translate/core';
import {MoviesStoreService} from '../../store/movies.store.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit, OnDestroy {


  title: string = this.translateService.instant('MOVIES.FORM.NEW_MOVIE');
  buttonName: string = this.translateService.instant('MOVIES.FORM.SAVE');
  movieForm: FormGroup;
  movie: MovieForm;
  arrayActors: Actor[];
  selectedActors: Array<number> = [];
  arrayGenres: Array<string> = [];
  arrayCompanies: Companies[];
  arrayMovies: Movie[];
  isEdit = false;

  private _destroyed$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              private _moviesService: MoviesService, private _moviesStore: MoviesStoreService,
              private translateService: TranslateService, private router: Router) {
  }

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.params.id;
    if (id) {
      this._moviesStore.setLoading(true);
      this._moviesService.getMovieById(id).subscribe(movie => {
        this.movie = movie;
        this.title = this.movie.title;
        this.buttonName = this.translateService.instant('MOVIES.FORM.UPDATE');
        this.isEdit = true;
        this.arrayGenres = this.movie.genre;
        this.movie.genre = [];
        this._moviesStore.setLoading(false);
        this.initForm();
      });
    } else {
      this.movie = {
        title: undefined,
        poster: undefined,
        genre: undefined,
        year: undefined,
        duration: undefined,
        imdbRating: undefined,
        actors: undefined,
        companies: undefined
      };
      this.initForm();
    }
  }

  initForm() {
    zip(this._moviesStore.getAllActors(), this._moviesStore.getAllCompanies(), this._moviesStore.getAllMovies())
      .pipe(takeUntil(this._destroyed$))
      .subscribe(([actors, studies, movies]) => {
        if (!actors && !studies && !movies) {
          this.goBack();
        } else {
          if (actors) {
            this.arrayActors = [...actors];
            if (this.isEdit) {
              this.setSelectedActors();
            }
          }
          if (studies) {this.arrayCompanies = [...studies];}
          if (movies) {
            this.arrayMovies = [...movies];
            if (!this.isEdit) {
              this.arrayMovies.sort((a, b) => a.id - b.id);
              this.movie.id = this.arrayMovies[this.arrayMovies.length - 1].id + 1;
            }
          }
          this.movieForm = this.formBuilder.group({
            title: [ this.movie.title , Validators.required ],
            poster: [this.movie.poster],
            actors: [this.movie.actors],
            genre: [this.movie.genre],
            companies: [this.movie.companies],
            year: [ this.movie.year , Validators.required ],
            duration: [ this.movie.duration , Validators.required],
            imdbRating: [ this.movie.imdbRating , Validators.required ],
          });
        }
      });
  }

  setSelectedActors() {
    for(const actorId of this.movie.actors) {
      const actor: Actor = this.arrayActors.find(a => a.id === actorId);
      this.selectedActors.push(actor.id);
    }
  }

  addGenre(event) {
    const formGenre = this.movieForm?.value?.genre;
    const existsGenre = this.arrayGenres.find(g => g === formGenre);
    if (!existsGenre) {
      this.arrayGenres.push(formGenre);
    }
    event.target.value = '';
  }

  submit() {
    const payload: Movie = {
      id: this.movie.id,
      title: this.movieForm.value.title || '',
      poster: this.movieForm.value.poster || '',
      genre: this.arrayGenres || [],
      year: this.movieForm.value.year || 0,
      duration: this.movieForm.value.duration || 0,
      imdbRating: this.movieForm.value.imdbRating || 0,
      actors: this.movieForm.value.actors || [],
      companies: this.movieForm.value.companies || 0,
    };
    this._moviesStore.setLoading(true);
    if (this.isEdit) {
      this._moviesService.updateMovie(payload).subscribe((result: Movie) => {
        this._moviesStore.setAllMovies(this.arrayMovies.map(m => {
          if (m.id === result.id) {
            return result;
          }
          return m;
        }));
      }, () => {}, () => {
        this._moviesStore.setLoading(false);
        this.goBack();
      });
    } else {
      this._moviesService.addMovie(payload).subscribe((result: Movie) => {
        this._moviesStore.setAllMovies([...this.arrayMovies, result]);
      }, () => {}, () => {
        this._moviesStore.setLoading(false);
        this.goBack();
      });
    }
  }

  goBack() {
    this.movieForm?.reset();
    this.router.navigate(['movies']).then();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}
