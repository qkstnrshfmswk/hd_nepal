import {Component} from '@angular/core';
import {NavController, NavParams,IonicPage} from 'ionic-angular';
import {Service} from '../../app/service';
import { Http } from '@angular/http';


@IonicPage()
@Component({
    selector: 'page-news',
    templateUrl: 'news.html',
    providers: [Service]
})
export class NewsPage {
    newsList: any[];
    exhibit_list:any;
    exhibit_name:any;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public newsService: Service,
                public http:Http) {
         this.http.get('http://ec2-34-224-40-186.compute-1.amazonaws.com:3000/exhibitList/')
        .subscribe(
        data =>
        {
          this.exhibit_list = data.json();
          this.exhibit_name = this.exhibit_list.exhibit_name
          console.log(this.exhibit_name);
          console.log(this.exhibit_list);
        },
        error =>
        {
          console.log("error");
        });

    }

    ngOnInit() {
        this.newsService.getData()
            .subscribe((response) => {
                this.newsList = response.newsList
            })
    }

    newsDetail(newsId) {
        this.navCtrl.push("NewsDetailPage", {
            newsId: newsId
        });
    }

}
