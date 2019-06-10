export class DatosMafi{
    constructor(
    ){}

    private nombreMAFI: string = "MAFI MOVIL";
    private versionMAFI: string = "V1.2";
    private tipoLector: string = "WATSON MINI";
    private idParametros: number = 2345;
    private tiempoLectura: number = 234;
    private intentosLectura: number = 1;

    public getNombreMAFI(): string
    {
        return this.nombreMAFI;
    }

    public setNombreMAFI(nombreMAFI: string
): void {
        this.nombreMAFI = nombreMAFI;
    }

    public getVersionMAFI(): string
    {
        return this.versionMAFI;
    }

    public setVersionMAFI(versionMAFI: string
): void {
        this.versionMAFI = versionMAFI;
    }

    public getTipoLector(): string
    {
        return this.tipoLector;
    }

    public setTipoLector(tipoLector: string
): void {
        this.tipoLector = tipoLector;
    }

    public getIdParametros(): number
    {
        return this.idParametros;
    }

    public setIdParametros(idParametros: number
): void {
        this.idParametros = idParametros;
    }

    public getTiempoLectura(): number
    {
        return this.tiempoLectura;
    }

    public setTiempoLectura(tiempoLectura: number
): void {
        this.tiempoLectura = tiempoLectura;
    }

    public getIntentosLectura(): number {
        return this.intentosLectura;
    }

    public setIntentosLectura(intentosLectura: number): void {
        this.intentosLectura = intentosLectura;
    }

}