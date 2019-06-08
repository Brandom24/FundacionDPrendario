export class DatosInstitucion{
    constructor( ){    }

    private fechaHora: string = "20170117165135";
    private idInstitucion: string = "TEST_FMP";
    private idEstacion: string = "ESTACION1";
    private referencia: string = "BID0000000001";
    private latitud: number = 33.679183;
    private longitud: number = -17.76792;
    private codigoPostal: string;
    private ciudad: string = "CDMX";
    private estado: string = "09";

    public getFechaHora(): string
    {
        return this.fechaHora;
    }

    public setFechaHora(fechaHora: string): void {
        this.fechaHora = fechaHora;
    }

    public getIdInstitucion(): string
    {
        return this.idInstitucion;
    }

    public setIdInstitucion(idInstitucion: string): void {
        this.idInstitucion = idInstitucion;
    }

    public getIdEstacion(): string
    {
        return this.idEstacion;
    }

    public setIdEstacion(idEstacion: string
): void {
        this.idEstacion = idEstacion;
    }

    public getReferencia(): string
    {
        return this.referencia;
    }

    public setReferencia(referencia: string
): void {
        this.referencia = referencia;
    }

    public getLatitud(): number
    {
        return this.latitud;
    }

    public setLatitud(latitud: number): void {
        this.latitud = latitud;
    }

    public getLongitud(): number
    {
        return this.longitud;
    }

    public setLongitud(longitud: number): void {
        this.longitud = longitud;
    }

    public getCodigoPostal(): string
    {
     this.codigoPostal = "CDMX"
        return this.codigoPostal;
    }

    public setCodigoPostal(codigoPostal: string
): void {
        this.codigoPostal = codigoPostal;
    }

    public getCiudad(): string
 {
        return this.ciudad;
    }

    public setCiudad(ciudad: string): void {
        this.ciudad = ciudad;
    }

    public getEstado(): string {
        return this.estado;
    }

    public setEstado(estado: string): void {
        this.estado = estado;
    }


}