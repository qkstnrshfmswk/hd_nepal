import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DPage } from './d';

@NgModule({
  declarations: [
    DPage,
  ],
  imports: [
    IonicPageModule.forChild(DPage),
  ],
  exports: [
    DPage
  ]
})
export class DPageModule {}
