import { JsonOperationData } from './json-operation-data.model';
import { JsonPersonalData } from './json-personal-data.model';

export class JsonInnerData{
    constructor(
        public personal_data: JsonPersonalData,
        public operation_data?: JsonOperationData,
        public metadata?: string
    ){}
}