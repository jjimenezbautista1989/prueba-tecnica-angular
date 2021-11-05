import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesPage } from './movies.page';
import {MovieViewComponent} from './pages/movie-view/movie-view.component';
import {MovieFormComponent} from './pages/movie-form/movie-form.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesPage
  },
  {
    path: 'view-movie/:id',
    component: MovieViewComponent
  },
  {
    path: 'add-movie',
    component: MovieFormComponent
  },
  {
    path: 'edit-movie/:id',
    component: MovieFormComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
