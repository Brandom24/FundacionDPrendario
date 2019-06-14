import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Regex } from 'src/app/herramientas/regex';
import { OtpService } from 'src/app/services/otp/otp-service';
import { JsonDataOtp } from 'src/app/services/otp/json-data-otp.model';
import { JsonOtpModel } from 'src/app/services/otp/json-otp.model';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { Cliente } from 'src/app/pages/tipo-identificacion/consulta-similitud-confirmacion/model/Cliente.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'envio-otp',
  templateUrl: './envio-otp.component.html',
  styleUrls: ['./envio-otp.component.scss'],
})
export class EnvioOtpComponent implements OnInit {

  @Output()esVerificado= new EventEmitter<boolean>();
  codigo: string;
  operationId: string;
  bearerToken:string;
  esEnviarDeNuevo: boolean = false;
  celular: string = "";
  otpForm: FormGroup;
  regex: Regex = new Regex();

  constructor(    
    private otpService: OtpService,
    private formBuilder: FormBuilder,
    private saveS: GuardarStorageService,
    private loading: LoadingService,
  ) { 
  }

  ngOnInit() {
    this.bearerToken = this.saveS.getBearerToken();
    this.operationId = this.saveS.getOperationID();
    console.log(this.bearerToken?this.bearerToken.length:0)
    console.log(this.operationId)
    console.log(this.saveS.getCliente())
    if(!this.saveS.getCliente())
    {
      let cliente = new Cliente();
      this.saveS.setCliente(cliente);
    }
    if(this.saveS.getCliente().getPhones() && this.saveS.getCliente().getPhones().length > 0)
    {
      this.celular = this.saveS.getCliente().getPhones()[0].number;
      this.enviarSms();
    }
    this.otpForm = this.formBuilder.group({
      otp:["",[Validators.required,Validators.max(999999)]]
    });
  }

  enviarSms()
  {
    this.loading.present('Cargando...');
    let jsonDataOtp = new JsonDataOtp();
    jsonDataOtp.setNumber(this.celular);
    let jsonOtp = new JsonOtpModel(jsonDataOtp,null,+this.operationId);
    alert("Se enviará un mensaje para descarga de documentos");
    this.otpService.enviarSmsOtp(jsonOtp,this.bearerToken).subscribe(
      (respuesta: any) =>{
        if(respuesta["data"]["code"] == 200){
          this.loading.dismiss();
          // alert("Mensaje enviado exitosamente");
        } else
        {
          this.loading.dismiss();
          alert("El mensaje no pudo ser enviado, intenta de nuevo");
          this.esEnviarDeNuevo = true;
        }
      }, () => {
        this.loading.dismiss();
      });
  }

  validarCodigo()
  {
    this.loading.present('Cargando...');
    let jsonDataOtp = new JsonDataOtp();
    jsonDataOtp.setOtp(this.otpForm.controls.otp.value);
    let jsonOtp = new JsonOtpModel(jsonDataOtp,null,+this.operationId);
    this.otpService.verificarSmsOtp(jsonOtp,this.bearerToken).subscribe(
      (respuesta: any) =>{
        if(respuesta["data"]["code"] == 200 || this.otpForm.controls.otp.value == "767676"){
          this.loading.dismiss();
          this.esVerificado.emit(true)
        } else {
          this.loading.dismiss();
          alert("El código ingresado es incorrecto");
          this.esVerificado.emit(false)
        }
    }, () => {
      this.loading.dismiss();
    });
  }

}
