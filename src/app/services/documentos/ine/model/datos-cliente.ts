export class DatosCliente{
    constructor(
        public nombre: string,
        public apellidoPaterno: string,
        public apellidoMaterno: string,
        public ocr: string,
        public anioRegistro: string,
        public anioEmision: string,
        public numeroEmision: string,
        public claveElector: string,
        public curp: string,
        public consentimiento: string = "true",
        public cic?: string
        ){}
}