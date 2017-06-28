import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
import {AgmCoreModule} from 'angular2-google-maps/core';
import { TranslaterModule } from '../../app/translate.module';


@NgModule({
  declarations: [
    LocationPage
  ],
  imports: [
    IonicPageModule.forChild(LocationPage),
      AgmCoreModule.forRoot({
       apiKey: 'AIzaSyDkIzaOmzxf0hm5Qd9h7YeEMtD5Iz_hpbY'
    }),
    TranslaterModule
    
  ],
  exports: [
    LocationPage
  ]
})
export class LocationPageModule {}