export class Secuence{
    constructor(){}
    private arregloSecuence={
        'carga_doc':1,
        'extraer_ocr':2,
        'enrola_huellas':3,
        'consulta_buro':4,
        'consulta_ine':5,
        'firma':6
    }
    obtenerIdActividad(nombreActividad: string): number{
        return this.arregloSecuence[nombreActividad];
    }
}