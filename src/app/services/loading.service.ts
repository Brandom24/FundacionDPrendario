import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;

  constructor(private loadingCtrl: LoadingController) { }

  async present( message: string ) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(
            // () => console.log('abort presenting')
            );
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(
      // () => console.log('dismissed')
      );
  }

}
