import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { GuardarStorageService } from '../../services/guardar-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = '';
  password = '';
  
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  estampaTiempo: string;  
  date = new Date();
  
  constructor(private navCtrl: NavController,
              private loginSrv: LoginService,
              private _store: GuardarStorageService) 
              {

                this.loginSrv.generateToken();
                
                this.estampaTiempo = (this.date.toLocaleDateString('es-MX', this.options)).toUpperCase(); 
               }

  ngOnInit() {
  }

  verifyUser() {
    this.loginSrv.verifyUser(this.user, this.password);
  }
}
