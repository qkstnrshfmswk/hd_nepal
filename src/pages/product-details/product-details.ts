import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ToastController,IonicPage} from 'ionic-angular';
import {Service} from '../../app/service';
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
    selector: 'page-product-details',
    templateUrl: 'product-details.html',
    providers: [Service]
})
export class ProductDetailsPage {
    count: number = 1;
    productId: number;
    noOfItems: number;
    cartItems: any[];
    ExtraOptions: any[] = [];
    itemInCart: any[] = [];
    Cart: any[] = [];
    prices: any[] = [{value: ''}];
    product: any = {
        sizeOption: {},
        extraOption: []
    };
    productDetails: any[] = [];

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public toastCtrl: ToastController,
                public navParams: NavParams,
                public storage: Storage,
                public service: Service) {
        this.productId = navParams.get('productId');
        this.cartItems = JSON.parse(localStorage.getItem('cartItem'));
        if (this.cartItems != null) {
            this.noOfItems = this.cartItems.length;
        }
        this.storage.get('favourite').then((favourite) => {
            this.favourites = favourite;
        })
         this.storage.get('favourite').then((favourites) => {
             this.favouriteItems = favourites;
         })
    }

    ngOnInit() {
        this.service.getData()
            .subscribe((response) => {
                for (let i = 0; i <= response.menuItems.length - 1; i++) {
                    if (response.menuItems[i].id == this.productId) {
                        this.productDetails = response.menuItems[i];
                        this.product.id = response.menuItems[i].id;
                        this.prices = response.menuItems[i].price;
                        this.ExtraOptions = response.menuItems[i].extraOptions;
                        this.product.name = response.menuItems[i].title;
                        this.product.image = response.menuItems[i].pictures;

                    }
                }
            })
    }


    addToCart(productId) {
        if (this.product.sizeOption.name == null) {
            let alert = this.alertCtrl.create({
                title: 'Please!',
                subTitle: 'Select Size and Price!',
                buttons: ['OK']
            });
            alert.present();
        }
        else {
            this.Cart = JSON.parse(localStorage.getItem("cartItem"));
            if (this.Cart == null) {
                this.product.Quantity = this.count;
                if(this.product.sizeOption.offerValue){
                   this.product.itemTotalPrice = this.product.Quantity * this.product.sizeOption.offerValue; 
                }else {
                this.product.itemTotalPrice = this.product.Quantity * this.product.sizeOption.value;
               }
                let proExtraPrice = 0;
                for (let i = 0; i <= this.product.extraOption.length - 1; i++) {
                    proExtraPrice = proExtraPrice + this.product.extraOption[i].value;
                    this.product.extraPrice = proExtraPrice;
                }

                this.itemInCart.push(this.product);
                localStorage.setItem('cartItem', JSON.stringify(this.itemInCart));

            }
            else {

                for (let i = 0; i <= this.Cart.length - 1; i++) {
                    if (this.Cart[i].id == productId) {
                        this.Cart.splice(i, 1);

                    }
                }
                this.product.Quantity = this.count;
                if(this.product.sizeOption.offerValue){
                   this.product.itemTotalPrice = this.product.Quantity * this.product.sizeOption.offerValue; 
                }else {
                this.product.itemTotalPrice = this.product.Quantity * this.product.sizeOption.value;
               }
                let proExtraPrice = 0;
                for (let i = 0; i <= this.product.extraOption.length - 1; ++i) {
                    proExtraPrice = proExtraPrice + this.product.extraOption[i].value;
                    this.product.extraPrice = proExtraPrice;
                }

                this.Cart.push(this.product);
                localStorage.setItem('cartItem', JSON.stringify(this.Cart));
            }
            this.navCtrl.push("CartPage");

        }
    }

    checkOptions(option) {
        if (this.product.extraOption.length !== 0) {
            for (let i = 0; i <= this.product.extraOption.length - 1; i++) {
                if (this.product.extraOption[i].name == option.name) {
                    this.product.extraOption.splice(i, 1);
                    break;
                }
                else {
                    this.product.extraOption.push(option);
                    break;
                }
            }
        }
        else {
            this.product.extraOption.push(option);
        }
    }

    sizeOptions(price) {
        this.product.sizeOption = price;
    }

    add() {
        if (this.count < 10) {
            this.count = this.count + 1;
        }
    }

    remove() {
        if (this.count > 1) {
            this.count = this.count - 1;
        }
    }

    home() {
        this.navCtrl.push("HomePage");
    }

    navcart() {
        this.navCtrl.push("CartPage");
    }

    //Add favourite

    visible = true;
    favourites: any[] = [];
    favourite: any[] = [];
    favouriteItems: any[] = [];


    toggleFavourite() {
        this.visible = !this.visible;
    }

    addToFavourite(productId) {
        this.createToaster('Added to favourites', '3000');

        if (this.favourites == null) {
            this.favourite.push(this.productDetails)
            this.storage.set('favourite', this.favourite);
        }
        else {
            for (let i = 0; i <= this.favourites.length - 1; i++) {
                if (this.favourites[i].id == productId) {
                    this.favourites.splice(i, 1);
                }
            }
            this.favourites.push(this.productDetails)
            this.storage.set('favourite', this.favourites);
        }
    }

    removeFromFavourite(productId) {
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


}

