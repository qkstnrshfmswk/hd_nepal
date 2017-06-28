import {Component} from '@angular/core';
import {NavController,IonicPage,LoadingController,Platform} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastController} from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';


@IonicPage()
@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html',
    providers:[Facebook,GooglePlus,TwitterConnect]
})
export class RegistrationPage {
    user: FormGroup;

    constructor(public navCtrl: NavController,
                public toastCtrl: ToastController,
                public fb: FormBuilder,
                public facebook:Facebook,
                public googlePlus:GooglePlus,
                public loadingCtrl:LoadingController,
                public twitter:TwitterConnect,
                public platform:Platform) {
    }

    onRegister() {
        if (this.user.value.name != '' && this.user.value.email != '' && this.user.value.password != '') {
            this.displayToast('User Successfully added!', 5000);
        }
    }

    displayToast(message, duration) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    }

    ngOnInit(): any {
        this.user = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            mobileNo: ['', Validators.required],
            password: ['', Validators.required],

        });
    }

    navLogin() {
        this.navCtrl.push("LoginPage");
    }
    doFbLogin() {
    let permissions = new Array();
    permissions = ["public_profile", "email", "user_education_history"];

    this.facebook.login(permissions)
      .then((success) => {
        console.log("facebook Success response->" + JSON.stringify(success));
        this.facebook.api("/me?fields=id,name,email,gender,first_name,last_name", permissions).then((user) => {
          console.log("user details" + JSON.stringify(user));
          console.log("access token-" + JSON.stringify(success.authResponse.accessToken));
           //here post data to Api
           localStorage.setItem('user', user.id);
          this.navCtrl.push("HomePage");
        }),
          (error) => {
            console.log(JSON.stringify(error));
            console.log('FAcebook not responding!');

          }

      }, error => {
        console.log("FaceBook ERROR : ", JSON.stringify(error));
      })
  }

  googleLogin() {
    this.googlePlus.login({
      'scopes': '',
      'webClientId': '557859355960-r2petg57jjsomcvkbs0bc4401n57l9ja.apps.googleusercontent.com',
      'offline': true
    })
      .then((success) => {
          console.log("you have been successfully logged in by googlePlus!" + JSON.stringify(success));
          //here post data to Api
          localStorage.setItem('user', success.userId);
          this.navCtrl.push("HomePage");
        },
        (error) => {
          console.log('error--' + JSON.stringify(error));

        })
  }

  twitterLogin(){
       this.platform.ready().then((res) => {
       if(res == 'cordova'){
    this.twitter.login().then((result)=> {
      console.log("twitter res--"+JSON.stringify(result));
   
      this.twitter.showUser().then((user)=>{
        console.log("user--"+JSON.stringify(user));
         //here post data to Api
        localStorage.setItem('user', user.id);
      this.navCtrl.push("HomePage");
      },
      (onError)=>{
      console.log("user--"+JSON.stringify(onError));
      })
    })
}
})
}


}
