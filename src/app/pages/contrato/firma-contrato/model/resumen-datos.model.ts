import { ResumenDoctos } from './resumen-doctos.model';

export class ResumenDatos{
    constructor(
        public nombre: string,
        public curp: string,
        public email: string,
        public tel: string,
        public listaDoctos: ResumenDoctos[]
    ){}
}