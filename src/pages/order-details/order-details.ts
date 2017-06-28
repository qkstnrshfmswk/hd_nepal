import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage } from 'ionic-angular';
import { Service } from '../../app/service';

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',

})
export class OrderDetailsPage {
     orderId:'';
     orderDetails:any={};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public service:Service) {
       this.orderId=this.navParams.get('orderId')
  }  

  

ngOnInit(){
	this.service.getData()
            .subscribe((response) => {
                for (let i = 0; i <= response.Orders.length - 1; i++) {
                    if (response.Orders[i].key == this.orderId) {                      
                      this.orderDetails=response.Orders[i]
                    }
                }
            })
}

 rate(itemId) {
    this.navCtrl.push("RatingPage")
  }
}
