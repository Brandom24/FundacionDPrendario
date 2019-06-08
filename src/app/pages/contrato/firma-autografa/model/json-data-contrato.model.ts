import { JsonCamposContrato } from './json-campos-contrato.model';

export class JsonDataContrato{
     constructor(
         public idTas: string,
         public codeContract: string,
         public campos: JsonCamposContrato[]
     ){}
}