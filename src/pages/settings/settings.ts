import {Component} from '@angular/core';
import {NavController,IonicPage} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {TranslateService} from 'ng2-translate';


@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class Settings {
    user: any = {};
    url: any = "assets/img/profile.jpg";
    value:any;
    options =  [
          {
            "language": "ENGLISH",
            "value":"en"
             },
          {
            "language":"FRENCH",
            "value":"fr"
          }
        ];
     

    constructor(public navCtrl: NavController,
        public translate:TranslateService) {
        this.value="en"
    }

    onSubmit(user: NgForm) {
        console.log("user Setting Data : " + JSON.stringify(this.user));
    }


    readUrl(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.url = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }

    }

     changeLanguage(){
      console.log("language is -"+this.value);
     if(this.value == 'fr'){
      console.log("Selected language is French");
      this.translate.use('fr');
     }
       else {
     console.log("Selected language is English");
     this.translate.use('en');
   }

     }
}
