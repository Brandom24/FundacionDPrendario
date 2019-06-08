import { JsonCamposContrato } from './json-campos-contrato.model';
import { JsonDataContrato } from './json-data-contrato.model';

export class JsonContrato{
    constructor(
        public operationId: number,
        public data: JsonDataContrato,
        public metadata?: string
    ){}
}