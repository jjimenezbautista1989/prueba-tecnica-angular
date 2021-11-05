import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesPageRoutingModule } from './movies-routing.module';

import { MoviesPage } from './movies.page';
import {SharedModule} from '../../shared/shared.module';
import {MovieViewComponent} from './pages/movie-view/movie-view.component';
import { MovieFormComponent } from './pages/movie-form/movie-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [MoviesPage, MovieViewComponent, MovieFormComponent]
})
export class MoviesPageModule {}
