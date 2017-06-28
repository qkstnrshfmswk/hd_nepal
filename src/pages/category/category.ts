import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {Service} from '../../app/service';

@IonicPage()
@Component({
    selector: 'page-category',
    templateUrl: 'category.html',
    providers: [Service]
})
export class CategoryPage {
    categories: any[] = [];

    constructor(public navCtrl: NavController, public service: Service) {
        this.service.getData()
            .subscribe((response) => {
                this.categories = response.categories;
            })
    }

    navigate(MenuId) {
        this.navCtrl.push("ProductListPage",
            {MenuId: MenuId}
        );
    }

}
