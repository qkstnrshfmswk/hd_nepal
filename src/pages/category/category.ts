import {Component} from '@angular/core';
import {NavController, IonicPage, NavParams} from 'ionic-angular';
import {Service} from '../../app/service';
import { Http } from '@angular/http';

@IonicPage()
@Component({
    selector: 'page-category',
    templateUrl: 'category.html',
    providers: [Service]
})
export class CategoryPage {
    categories: any[] = [];
    public exhibition_ID:any;
    public exhibit;
    public img;
    public desc;
    public loc;
    public name;
    public section;
    constructor(public navCtrl: NavController, public service: Service, public http:Http, public navParams:NavParams) {
        this.exhibition_ID = navParams.get("ID");
        console.log("id"+this.exhibition_ID);
        this.http.get('http://ec2-34-224-40-186.compute-1.amazonaws.com:3000/exhibit/'+this.exhibition_ID)
        .subscribe(
        data =>
        {
          this.exhibit = data.json();
          this.img = this.exhibit[0].exhibit_img;
          this.desc = this.exhibit[0].exhibit_desc;
          this.loc = this.exhibit[0].exhibit_loc;
          this.name = this.exhibit[0].exhibit_name;
          this.section = this.exhibit[0].section_list;
          console.log(this.name);
          console.log(this.exhibit);
        },
        error =>
        {
          console.log("error");
        });
    }

    navigate(MenuId) {
        this.navCtrl.push("ProductListPage",
            {MenuId: MenuId}
        );
    }

}
