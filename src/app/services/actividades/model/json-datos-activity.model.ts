import { JsonData } from './json-data.model';
import { JsonMetadata } from './json-metadata.model';

export class JsonDatosActivity {
    constructor(
        public data: JsonData,
        public metadata: JsonMetadata,
        public operationId?: number
    ) {}
}
