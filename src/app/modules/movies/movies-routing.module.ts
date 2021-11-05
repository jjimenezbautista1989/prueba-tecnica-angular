import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesPage } from './movies.page';
import {MovieViewComponent} from './pages/movie-view/movie-view.component';

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
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
