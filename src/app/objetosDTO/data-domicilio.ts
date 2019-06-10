export class DataDomicilio {

    private id: number;
    private tipoDomicilio: string;
    private estado: string;
    private ciudad: string;
    private calle: string;
    private numero: string;
    private numInter: string;
    private colonia: string;
    private pais: string;
    private bis: boolean;

    constructor() { }

    public getId(): number {
        return this.id;
    }

    public setId(id: number
    ): void {
        this.id = id;
    }

    public getTipoDomicilio(): string {
        return this.tipoDomicilio;
    }

    public setTipoDomicilio(tipoDomicilio: string
    ): void {
        this.tipoDomicilio = tipoDomicilio;
    }

    public getEstado(): string {
        return this.estado;
    }

    public setEstado(estado: string
    ): void {
        this.estado = estado;
    }

    public getCiudad(): string {
        return this.ciudad;
    }

    public setCiudad(ciudad: string
    ): void {
        this.ciudad = ciudad;
    }

    public getCalle(): string {
        return this.calle;
    }

    public setCalle(calle: string
    ): void {
        this.calle = calle;
    }

    public getNumero(): string {
        return this.numero;
    }

    public setNumero(numero: string
    ): void {
        this.numero = numero;
    }

    public getNumInter(): string {
        return this.numInter;
    }

    public setNumInter(numInter: string
    ): void {
        this.numInter = numInter;
    }

    public getColonia(): string {
        return this.colonia;
    }

    public setColonia(colonia: string
    ): void {
        this.colonia = colonia;
    }

    public getPais(): string {
        return this.pais;
    }

    public setPais(pais: string
    ): void {
        this.pais = pais;
    }

    public isBis(): boolean {
        return this.bis;
    }

    public setBis(bis: boolean): void {
        this.bis = bis;
    }
}