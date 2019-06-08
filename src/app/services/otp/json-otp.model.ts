import { JsonMetadata } from '../actividades/model/json-metadata.model';
import { JsonDataOtp } from './json-data-otp.model';

export class JsonOtpModel{
    constructor(
        public data: JsonDataOtp,
        public metadata: JsonMetadata,
        public operationId: number
    ){}
}