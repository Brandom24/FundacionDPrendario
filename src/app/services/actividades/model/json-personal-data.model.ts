import { JsonAddress } from './json-address.model';
import { Phone } from 'src/app/pages/tipo-identificacion/consulta-similitud-confirmacion/model/Phone.model';

export class JsonPersonalData {
    constructor(
        public id: number,
        public code: string,
        public first_name: string,
        public middle_name: string,
        public last_name: string,
        public sex: string,
        public birth_date: string,
        public language: string,
        public SSN: string,
        public country_of_birth: string,
        public email: string,
        public person_type_Id: string,
        public marital_status: string,
        public ocr?: string,
        public rfc?: string,
        public curp?: string,
        public addresses?: JsonAddress[],
        public data?: string,
        public phone?: Phone[]
 
    ){}
}