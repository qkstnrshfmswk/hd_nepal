import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  review: any = {
    rating: '',
    comment: ''
  }
  itemId: '';
  index: '';
  orderId: '';
  reviews: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams
              ) {
         this.itemId = this.navParams.get('itemId');
         this.index = this.navParams.get('index');
         this.orderId = this.navParams.get('orderId');

    

  }

  onSubmit() {
    console.log('review-' + JSON.stringify(this.review));
    
    }

}
