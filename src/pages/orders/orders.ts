import {Component} from '@angular/core';
import {NavController,IonicPage} from 'ionic-angular';
import {Service} from '../../app/service';


@IonicPage()
@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html',
    providers: [Service]
})
export class OrdersPage {
    orders: any[] = [];
    featured: any[] = [];

    constructor(public navCtrl: NavController, public service: Service) {}

    
    ngOnInit(){
        this.service.getData()
            .subscribe((response) => {
                this.orders = response.Orders;
                this.featured = response.featured;
                 console.log(JSON.stringify(this.orders));
            })
    }
    orderDetails(orderId) {
      this.navCtrl.push("OrderDetailsPage",{
             orderId:orderId
         });
    }
}
