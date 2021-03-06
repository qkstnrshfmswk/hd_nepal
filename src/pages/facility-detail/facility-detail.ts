import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FacilityDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-facility-detail',
  templateUrl: 'facility-detail.html',
})
export class FacilityDetailPage {
  facilityType:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.facilityType = navParams.get("facilityType");
    console.log(this.facilityType);  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacilityDetailPage');
  }

}
