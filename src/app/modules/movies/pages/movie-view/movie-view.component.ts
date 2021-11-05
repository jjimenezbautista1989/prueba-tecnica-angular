import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieForm} from '../../interfaces/movie-form';
import {Companies} from '../../../../shared/interfaces/companies';
import {Subject, zip} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../../../../core/services/movies.service';
import {takeUntil} from 'rxjs/operators';
import {MoviesStoreService} from '../../store/movies.store.service';
import {Actor} from '../../../../shared/interfaces/actor';

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
        this.initView();
      }, () => {
        this.goBack();
      });
    } else {
      this.goBack();
    }
  }

  initView() {
    zip(this._moviesStore.getAllActors(), this._moviesStore.getAllCompanies())
      .pipe(takeUntil(this._destroyed$))
      .subscribe(([actors, studies]) => {
        if (actors) {
          for (const actorId of this.movie.actors) {
            const actor: Actor = actors.find(a => a.id === actorId);
            this.arrayActorsName.push(actor.first_name.concat(' ').concat(actor.last_name));
          }
        }
        if (studies) {this.arrayCompanies = [...studies];}
        this._moviesStore.setLoading(false);
      });
  }

  getStudiesName(id) {
    const studies = this.arrayCompanies?.find(s => s.id === id);
    return studies?.name;
  }

  goBack() {
    this.router.navigate(['movies']);
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}
