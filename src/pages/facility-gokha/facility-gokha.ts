import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FacilityGokhaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-facility-gokha',
  templateUrl: 'facility-gokha.html',
})
export class FacilityGokhaPage {
  facilityType:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.facilityType = navParams.get("facilityType");
    console.log(this.facilityType);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacilityGokhaPage');
  }

}
