import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoPagePage } from './no-page.page';

const routes: Routes = [
  {
    path: '',
    component: NoPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoPagePageRoutingModule {}
