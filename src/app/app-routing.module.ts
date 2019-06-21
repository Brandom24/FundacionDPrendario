import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'resumen', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'direcciones', loadChildren: './pages/direcciones/direcciones.module#DireccionesPageModule' },
  { path: 'clientes-lista', loadChildren: './pages/clientes-lista/clientes-lista.module#ClientesListaPageModule' },
  { path: 'localizacion', loadChildren: './pages/localizacion/localizacion.module#LocalizacionPageModule' },
  { path: 'vivienda', loadChildren: './pages/vivienda/vivienda.module#ViviendaPageModule' },
  { path: 'menu-principal', loadChildren: './pages/menu-principal/menu-principal.module#MenuPrincipalPageModule' },
  { path: 'tipo-identificacion', loadChildren: './pages/tipo-identificacion/tipo-identificacion.module#TipoIdentificacionPageModule' },
  { path: 'identificacion-oficial', loadChildren:
  './pages/tipo-identificacion/identificacion-oficial/identificacion-oficial.module#IdentificacionOficialPageModule' },
  { path: 'biometria-dactilar', loadChildren:
  './pages/tipo-identificacion/biometria-dactilar/biometria-dactilar.module#BiometriaDactilarPageModule' },
  { path: 'consulta-similitud', loadChildren:
  './pages/tipo-identificacion/consulta-similitud/consulta-similitud.module#ConsultaSimilitudPageModule' },
  { path: 'consulta-similitud-confirmacion', loadChildren:
// tslint:disable-next-line: max-line-length
  './pages/tipo-identificacion/consulta-similitud-confirmacion/consulta-similitud-confirmacion.module#ConsultaSimilitudConfirmacionPageModule' },
  { path: 'captura-domicilio', loadChildren: './pages/contrato/captura-domicilio/captura-domicilio.module#CapturaDomicilioPageModule' },
  { path: 'firma-autografa', loadChildren: './pages/contrato/firma-autografa/firma-autografa.module#FirmaAutografaPageModule' },
  { path: 'firma-contrato', loadChildren: './pages/contrato/firma-contrato/firma-contrato.module#FirmaContratoPageModule' },
// tslint:disable-next-line: max-line-length
  { path: 'captura-domicilio-confirm', loadChildren: './pages/contrato/captura-domicilio-confirm/captura-domicilio-confirm.module#CapturaDomicilioConfirmPageModule' },
  { path: 'consulta-ine', loadChildren: './pages/contrato/consulta-ine/consulta-ine.module#ConsultaInePageModule' },
// tslint:disable-next-line: max-line-length
  { path: 'identificacion-pasaporte', loadChildren: './pages/tipo-identificacion/identificacion-pasaporte/identificacion-pasaporte.module#IdentificacionPasaportePageModule' },
  { path: 'info-grales', loadChildren: './pages/info-grales/info-grales.module#InfoGralesPageModule' },
  { path: 'consulta-buro', loadChildren: './pages/contrato/firma-autografa/consulta-buro/consulta-buro.module#ConsultaBuroPageModule' },
  { path: 'verify', loadChildren: './pages/verify/verify.module#VerifyPageModule' },
  { path: 'resumen', loadChildren: './pages/verify/resumen/resumen.module#ResumenPageModule' },
  { path: 'finalizar', loadChildren: './pages/contrato/finalizar/finalizar.module#FinalizarModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
