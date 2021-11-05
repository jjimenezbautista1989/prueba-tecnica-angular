import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {DurationPipe} from './pipes/duration.pipe';



@NgModule({
    declarations: [
        HeaderComponent,
        DurationPipe
    ],
    exports: [
        HeaderComponent,
        TranslateModule,
        DurationPipe
    ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ]
})
export class SharedModule { }
