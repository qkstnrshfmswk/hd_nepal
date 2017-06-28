import {Component} from '@angular/core';
import {NavController, NavParams,IonicPage,ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
    selector: 'page-favourite',
    templateUrl: 'favourite.html'
})
export class FavouritePage {
    favouriteItems: any[] = [];
    cartItems: any[] = [];
    noOfItems: number;
    bg:any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl:ToastController,
                public storage: Storage) {

        this.bg='assets/img/bg.jpg';
        this.storage.get('favourite').then((favourite) => {
            this.favouriteItems = favourite;
        });
        this.cartItems = JSON.parse(localStorage.getItem('cartItem'));
        if (this.cartItems != null) {
            this.noOfItems = this.cartItems.length;
        }
    }

    navcart() {
        this.navCtrl.push("CartPage");
    }

    buyNow(productId) {
        this.navCtrl.push("ProductDetailsPage", {
            productId: productId
        });
    }

   

    isFavourite():boolean {
           if (this.favouriteItems.length == 0) {
        return false;
    }
       else  {
        return true;
    }
}



    removeFromFavourites(productId) {
        this.storage.get('favourite').then((favourites) => {
            this.favouriteItems = favourites;
            this.createToaster('Removed from favourites', '3000');
            for (let i = 0; i <= this.favouriteItems.length - 1; i++) {
                if (this.favouriteItems[i].id == productId) {
                    this.favouriteItems.splice(i, 1);
                }
            }
            this.storage.set('favourite', this.favouriteItems);

        })

    }

    createToaster(message, duration) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    }

   home() {
        this.navCtrl.push("HomePage");
    }
}
