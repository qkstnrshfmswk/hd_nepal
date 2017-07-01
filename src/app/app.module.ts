import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MyApp} from './app.component';
import {Service} from '../app/service';
import {IonicStorageModule} from '@ionic/storage';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';
import {Http, HttpModule} from '@angular/http';
import {BrowserModule} from "@angular/platform-browser";
import { CategoryPage } from '../pages/category/category';
import { FacilityPage } from '../pages/facility/facility';
import { FacilityPageModule } from '../pages/facility/facility.module';
import { FacilityDetailPageModule } from '../pages/facility-detail/facility-detail.module';
import { FacilityGokhaPageModule } from '../pages/facility-gokha/facility-gokha.module';
import { FacilityLibraryPageModule } from '../pages/facility-library/facility-library.module';

//entry point에 추가
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
    declarations: [
        MyApp,
        CategoryPage
    ],
    imports: [
        IonicModule.forRoot(MyApp, {
            backButtonText: ''
        },),
        IonicStorageModule.forRoot(),
        BrowserModule,
        FacilityPageModule,
        FacilityDetailPageModule,
        FacilityGokhaPageModule,
        FacilityLibraryPageModule,
        HttpModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [Http]
        })

    ],
    exports: [BrowserModule, HttpModule, TranslateModule],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        CategoryPage,
        FacilityPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        Service,
        StatusBar,
        SplashScreen
    ]
})
export class AppModule {
}
