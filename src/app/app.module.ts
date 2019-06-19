import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ClientesListaPageModule } from './pages/clientes-lista/clientes-lista.module';
import { PipesModule } from './pipes/pipes.module';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DocumentosService } from './services/documentos/documentos.service';
import { OauthService } from './services/oauth.service';
import { ActivitiesService } from './services/actividades/activities-service';
import { SignaturePadModule } from 'angular2-signaturepad';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
/* {hardwareBackButton: false} */
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, SignaturePadModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ClientesListaPageModule,
    PipesModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar, InAppBrowser,
    SplashScreen,
    Camera,
    Geolocation,
    SQLite,
    DocumentosService, OauthService, ActivitiesService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
