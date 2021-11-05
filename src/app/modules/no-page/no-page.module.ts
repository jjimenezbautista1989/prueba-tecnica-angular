import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoPagePageRoutingModule } from './no-page-routing.module';

import { NoPagePage } from './no-page.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NoPagePageRoutingModule,
        SharedModule
    ],
  declarations: [NoPagePage]
})
export class NoPagePageModule {}
