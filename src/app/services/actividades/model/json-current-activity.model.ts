import { JsonData } from './json-data.model';

export class JsonCurrentActivity{
    constructor(
        public data: JsonData,
        public operationId?: string
    ){}
}