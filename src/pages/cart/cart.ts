import {Component} from "@angular/core";
import { IonicPage,AlertController, NavController, PopoverController,ToastController} from "ionic-angular";


@IonicPage()
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html'
})
export class CartPage {
    cartItems: any[] = [];
    SubTotalPrice: number;
    totalVat: number;
    otherTaxes: number;
    GrandTotal: number;
    noOfItems: number;
    couponCode:any='';
   

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public popoverCtrl: PopoverController,
                public toastCtrl:ToastController) {
        this.cartItems = JSON.parse(localStorage.getItem('cartItem'));
        //console.log("items--"+JSON.stringify(this.cartItems));
        if (this.cartItems != null) {
            this.noOfItems = this.cartItems.length;
            this.CalculatePrice();
        }
    }

    deleteItem(data) {
        for (let i = 0; i <= this.cartItems.length - 1; i++) {
            if (this.cartItems[i].id == data.id) {
                this.cartItems.splice(i, 1);
            }
        }

        if (localStorage.getItem('cartItem') == null || this.cartItems.length == 0) {
            this.SubTotalPrice = 0;
            this.totalVat = 0;
            this.otherTaxes = 0;
            this.GrandTotal = 0;
        }
        else {
            this.CalculatePrice();

        }
        
        localStorage.setItem('cartItem', JSON.stringify(this.cartItems));
        this.cartItems = JSON.parse(localStorage.getItem('cartItem'));
        this.noOfItems = this.noOfItems - 1;
    }

    
   deductedPrice:number;

    applyCoupon(){
        console.log("subtotal-"+this.SubTotalPrice);
        console.log("code-"+this.couponCode);
        if(this.couponCode=='apply20' ){
           let subTotals=this.SubTotalPrice;
           this.deductedPrice=Math.ceil(20/100*subTotals);
         subTotals=subTotals-(this.deductedPrice);
         console.log("subtotal--"+subTotals);
         this.GrandTotal = Math.ceil(subTotals + this.totalVat + this.otherTaxes); 
        this.createToaster('Coupon applied successfully','3000');
        }
        else if(this.couponCode=='apply25' ){
         let subTotals=this.SubTotalPrice;
          this.deductedPrice=Math.ceil(25/100*subTotals);
         subTotals=subTotals-(this.deductedPrice);
        // subTotals=subTotals-(25/100*subTotals);
         console.log("subtotal--"+subTotals);
         this.GrandTotal = Math.ceil(subTotals + this.totalVat + this.otherTaxes); 
         this.createToaster('Coupon applied successfully','3000');
        }
        else if(this.couponCode=='apply30' ){
         let subTotals=this.SubTotalPrice;
          this.deductedPrice=Math.ceil(30/100*subTotals);
         subTotals=subTotals-(this.deductedPrice);
         //subTotals=subTotals-(30/100*subTotals);
         console.log("subtotal--"+subTotals);
         this.GrandTotal = Math.ceil(subTotals + this.totalVat + this.otherTaxes); 
         this.createToaster('Coupon applied successfully','3000');
        }
        else {
        this.createToaster('Coupon already applied','3000');  
         }
        this.couponCode='';
       
        
    }

    checkout() {
    this.navCtrl.push("CheckoutPage");
    }

    CalculatePrice() {
        let proGrandTotalPrice = 0;
        for (let i = 0; i <= this.cartItems.length; i++) {
            if (this.cartItems[i] != null) {
                if (this.cartItems[i].extraPrice != null) {
                    proGrandTotalPrice = proGrandTotalPrice + this.cartItems[i].itemTotalPrice + this.cartItems[i].extraPrice;
                } else {
                    proGrandTotalPrice = proGrandTotalPrice + this.cartItems[i].itemTotalPrice;
                }
                this.SubTotalPrice = proGrandTotalPrice;
            }
        }
        this.totalVat = ((5 / 100) * this.SubTotalPrice);
        this.otherTaxes = ((3 / 100) * this.SubTotalPrice);
        this.GrandTotal = Math.ceil(this.SubTotalPrice + this.totalVat + this.otherTaxes);
    }
     

  add(data) {
    if (data.Quantity < 20) {
      data.Quantity = data.Quantity + 1;
      for (let i = 0; i <= this.cartItems.length - 1; i++) {
      if (this.cartItems[i].id == data.id) {
        this.cartItems[i].Quantity = data.Quantity;
        if(this.cartItems[i].sizeOption.offerValue){
            this.cartItems[i].itemTotalPrice = (data.Quantity * this.cartItems[i].sizeOption.offerValue);
        } else {
        this.cartItems[i].itemTotalPrice = (data.Quantity * this.cartItems[i].sizeOption.value);
      }
  }
    }
    localStorage.setItem('cartItem', JSON.stringify(this.cartItems));
    this.CalculatePrice();
    }
  }

  remove(data) {

    if (data.Quantity > 1) {
    data.Quantity =data.Quantity - 1;
      for (let i = 0; i <= this.cartItems.length - 1; i++) {
      if (this.cartItems[i].id == data.id) {
        this.cartItems[i].Quantity = data.Quantity;
        if(this.cartItems[i].sizeOption.offerValue){
        this.cartItems[i].itemTotalPrice = (data.Quantity * this.cartItems[i].sizeOption.offerValue);
        } else {
        this.cartItems[i].itemTotalPrice = (data.Quantity * this.cartItems[i].sizeOption.value);
      }
      }
    }
    localStorage.setItem('cartItem', JSON.stringify(this.cartItems));
    this.CalculatePrice();
    }
  }
   createToaster(message, duration) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    }

      isCart():boolean {
           if (localStorage.getItem('cartItem') == null || this.cartItems.length == 0) {
        return false;
    }
       else  {
        return true;
    }
}
    gotoHome(){
        
         localStorage.removeItem('cartItem');
         this.navCtrl.push("HomePage");
      }


}
