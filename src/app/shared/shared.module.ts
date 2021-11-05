import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {DurationPipe} from './pipes/duration.pipe';
import {TagComponent} from './components/tag/tag.component';


@NgModule({
  declarations: [
    HeaderComponent,
    TagComponent,
    DurationPipe
  ],
  exports: [
    HeaderComponent,
    TranslateModule,
    DurationPipe,
    TagComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ]
})
export class SharedModule {
}
