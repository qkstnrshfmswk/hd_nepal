import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { FacilityDetailPage } from '../facility-detail/facility-detail';
/**
 * Generated class for the FacilityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-facility',
  templateUrl: 'facility.html',
})
export class FacilityPage {
public facility:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
        this.http.get('http://ec2-34-224-40-186.compute-1.amazonaws.com:3000/facility/')
        .subscribe(
        data =>
        {
          this.facility = data.json();
          console.log(this.facility);
        },
        error =>
        {
          console.log("error");
        });  

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacilityPage');
  }
  gotoDetail(Type){
    if(Type=="Library"){
      this.navCtrl.push("FacilityLibraryPage", {
        facilityType:Type});
    }else if(Type == "Gokha Village Restaurant")
    {
      this.navCtrl.push("FacilityGokhaPage", {
        facilityType:Type });
    }else{
      this.navCtrl.push("FacilityDetailPage", {
        facilityType:Type});
    }
  }
}
