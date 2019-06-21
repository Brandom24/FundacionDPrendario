import { JsonAddress } from 'src/app/services/actividades/model/json-address.model';
import { Phone } from './Phone.model';

export class Cliente {

    private nombre: string;
    private paterno: string;
    private materno: string;
    private anioRegistro: string;
    private emision: string;
    private claveElector: string;
    private curp: string;
    private observations: string;
    private rfc: string;
    private ocr: string;
    private vigencia: string;
    private nacimiento: string;
    private sexo: string;
    private telefono: string;
    private paisDeNacimiento: string;
    private tipoCliente: number;
    private tipoId: number;
    private numId: string;
    private autoridadEmiteId: string;
    private nacionalidad: number;
    private edoCivil: number;
    private actividad: number;
    private rangoSalarial: number;
    private actividadEmpresarial: number;
    private mail: string;
    private esNotifVencim: boolean;
    private facebook: string;
    private esRecibirNotific: boolean;
    private tipoDomic: number;
    private calle: string;
    private numeroDomic: string;
    private esBis: boolean;
    private numInt: string;
    private colonia: string;
    private pais: number;
    private esEmpleado: boolean;
    private ciudad: number;
    private codigoPostal: string;
    private estado: number;
    private phones: Phone[];
    private jsonAddress: JsonAddress[];
    private asociarTel: any;
    private asociarEmail: any;
    private asociarDomi: any;
    private paisS: string;

    constructor() { }
    public getJsonAddress(): JsonAddress[] {
        return this.jsonAddress;
    }

    public setJsonAddress(jsonAddress: JsonAddress[]): void {
        this.jsonAddress = jsonAddress;
    }

    //observations
    public getObservations(): string {
        return this.observations;
    }

    public setObservations(observations: string) {
        this.observations = observations;
    }

    public getPaisS(): string {
        return this.paisS;
    }

    public setPaisS(paisS: string){
        this.paisS = paisS;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string
    ): void {
        this.nombre = nombre;
    }

    public getPaterno(): string {
        return this.paterno;
    }

    public setPaterno(paterno: string
    ): void {
        this.paterno = paterno;
    }

    public getMaterno(): string {
        return this.materno;
    }

    public setMaterno(materno: string
    ): void {
        this.materno = materno;
    }

    public getAnioRegistro(): string {
        return this.anioRegistro;
    }

    public setAnioRegistro(anioRegistro: string
    ): void {
        this.anioRegistro = anioRegistro;
    }

    public getEmision(): string {
        return this.emision;
    }

    public setEmision(emision: string
    ): void {
        this.emision = emision;
    }

    public getClaveElector(): string {
        return this.claveElector;
    }

    public setClaveElector(claveElector: string
    ): void {
        this.claveElector = claveElector;
    }

    public getCurp(): string {
        return this.curp;
    }

    public setCurp(curp: string
    ): void {
        this.curp = curp;
    }

    public getRfc(): string {
        return this.rfc;
    }

    public setRfc(rfc: string
    ): void {
        this.rfc = rfc;
    }

    public getOcr(): string {
        return this.ocr;
    }

    public setOcr(ocr: string
    ): void {
        this.ocr = ocr;
    }

    public getVigencia(): string {
        return this.vigencia;
    }

    public setVigencia(vigencia: string
    ): void {
        this.vigencia = vigencia;
    }

    public getNacimiento(): string {
        return this.nacimiento;
    }

    public setNacimiento(nacimiento: string
    ): void {
        this.nacimiento = nacimiento;
    }

    public getSexo(): string {
        return this.sexo;
    }

    public setSexo(sexo: string
    ): void {
        this.sexo = sexo;
    }

    public getTelefono(): string {
        return this.telefono;
    }

    public setTelefono(telefono: string
    ): void {
        this.telefono = telefono;
    }

    public getPaisDeNacimiento(): string {
        return this.paisDeNacimiento;
    }

    public setPaisDeNacimiento(paisDeNacimiento: string
    ): void {
        this.paisDeNacimiento = paisDeNacimiento;
    }

    public getTipoCliente(): number {
        return this.tipoCliente;
    }

    public setTipoCliente(tipoCliente: number
    ): void {
        this.tipoCliente = tipoCliente;
    }

    public getTipoId(): number {
        return this.tipoId;
    }

    public setTipoId(tipoId: number
    ): void {
        this.tipoId = tipoId;
    }

    public getNumId(): string {
        return this.numId;
    }

    public setNumId(numId: string
    ): void {
        this.numId = numId;
    }

    public getAutoridadEmiteId(): string {
        return this.autoridadEmiteId;
    }

    public setAutoridadEmiteId(autoridadEmiteId: string
    ): void {
        this.autoridadEmiteId = autoridadEmiteId;
    }

    public getNacionalidad(): number {
        return this.nacionalidad;
    }

    public setNacionalidad(nacionalidad: number
    ): void {
        this.nacionalidad = nacionalidad;
    }

    public getEdoCivil(): number {
        return this.edoCivil;
    }

    public setEdoCivil(edoCivil: number
    ): void {
        this.edoCivil = edoCivil;
    }

    public getActividad(): number {
        return this.actividad;
    }

    public setActividad(actividad: number
    ): void {
        this.actividad = actividad;
    }

    public getRangoSalarial(): number {
        return this.rangoSalarial;
    }

    public setRangoSalarial(rangoSalarial: number
    ): void {
        this.rangoSalarial = rangoSalarial;
    }

    public getActividadEmpresarial(): number {
        return this.actividadEmpresarial;
    }

    public setActividadEmpresarial(actividadEmpresarial: number
    ): void {
        this.actividadEmpresarial = actividadEmpresarial;
    }

    public getMail(): string {
        return this.mail;
    }

    public setMail(mail: string
    ): void {
        this.mail = mail;
    }

    public getEsNotifVencim(): boolean {
        return this.esNotifVencim;
    }

    public setEsNotifVencim(esNotifVencim: boolean
    ): void {
        this.esNotifVencim = esNotifVencim;
    }

    public getFacebook(): string {
        return this.facebook;
    }

    public setFacebook(facebook: string
    ): void {
        this.facebook = facebook;
    }

    public getEsRecibirNotific(): boolean {
        return this.esRecibirNotific;
    }

    public setEsRecibirNotific(esRecibirNotific: boolean
    ): void {
        this.esRecibirNotific = esRecibirNotific;
    }

    public getTipoDomic(): number {
        return this.tipoDomic;
    }

    public setTipoDomic(tipoDomic: number
    ): void {
        this.tipoDomic = tipoDomic;
    }

    public getCalle(): string {
        return this.calle;
    }

    public setCalle(calle: string
    ): void {
        this.calle = calle;
    }

    public getNumeroDomic(): string {
        return this.numeroDomic;
    }

    public setNumeroDomic(numeroDomic: string
    ): void {
        this.numeroDomic = numeroDomic;
    }

    public getEsBis(): boolean {
        return this.esBis;
    }

    public setEsBis(esBis: boolean
    ): void {
        this.esBis = esBis;
    }

    public getNumInt(): string {
        return this.numInt;
    }

    public setNumInt(numInt: string
    ): void {
        this.numInt = numInt;
    }

    public getColonia(): string {
        return this.colonia;
    }

    public setColonia(colonia: string
    ): void {
        this.colonia = colonia;
    }

    public getPais(): number {
        return this.pais;
    }

    public setPais(pais: number
    ): void {
        this.pais = pais;
    }

    public getEsEmpleado(): boolean {
        return this.esEmpleado;
    }

    public setEsEmpleado(esEmpleado: boolean
    ): void {
        this.esEmpleado = esEmpleado;
    }

    public getCiudad(): number {
        return this.ciudad;
    }

    public setCiudad(ciudad: number
    ): void {
        this.ciudad = ciudad;
    }

    public getCodigoPostal(): string {
        return this.codigoPostal;
    }

    public setCodigoPostal(codigoPostal: string
    ): void {
        this.codigoPostal = codigoPostal;
    }

    public getEstado(): number {
        return this.estado;
    }

    public setEstado(estado: number
    ): void {
        this.estado = estado;
    }

    public getPhones(): Phone[] {
        return this.phones;
    }

    public setPhones(phones: Phone[]
    ): void {
        this.phones = phones;
    }

    public getAsociarTel(): any {
        return this.asociarTel;
    }

    public setAsociarTel(asociarTel: any
    ): void {
        this.asociarTel = asociarTel;
    }

    public getAsociarEmail(): any {
        return this.asociarEmail;
    }

    public setAsociarEmail(asociarEmail: any
    ): void {
        this.asociarEmail = asociarEmail;
    }

    public getAsociarDomi(): any {
        return this.asociarDomi;
    }

    public setAsociarDomi(asociarDomi: any): void {
        this.asociarDomi = asociarDomi;
    }

    // public getPrivate(): jsonAddress: {
    //     return this.private;
    // }

    // public setPrivate(private: jsonAddress:): void {
    //     this.private = private;
    // }

}