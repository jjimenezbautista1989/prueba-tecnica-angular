import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'no-page',
    loadChildren: () => import('./modules/no-page/no-page.module').then( m => m.NoPagePageModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./modules/movies/movies.module').then( m => m.MoviesPageModule)
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'no-page',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
