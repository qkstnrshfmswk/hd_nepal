import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Settings } from './settings';
import { TranslaterModule } from '../../app/translate.module';


@NgModule({
  declarations: [
    Settings
  ],
  imports: [
    IonicPageModule.forChild(Settings),
    TranslaterModule
    
  ],
  exports: [
    Settings
  ]
})
export class SettingsModule {}