export class ResumenDoctos{
    constructor(
        public logoTipo: string,
        public nombreDoc: string,
        public tipoIdentificacion: string,
        public referenciaArchivo: string,
        public base64Archivo?: string
    ){}
}