export class JsonResDomicilio {
    constructor(
        public resultOK: boolean,
        public errorMessage: string,
        public message: string,
        public nombre: string,
        public calle: string,
        public referencia: string,
        public colonia: string,
        public ciudad: string,
        public fecha: string,
        public estatus: string,
        public mensaje: string,
        public codigoValidacion: string,
        public tasReference?: string
    ) {}
}
