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


export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        BrowserModule,
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
        MyApp
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
