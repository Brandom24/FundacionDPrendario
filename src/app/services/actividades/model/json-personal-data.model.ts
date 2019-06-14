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
    ) {}
}



/* 

{\"operation_data\": 
{\"lead\": \"bid\"},
\"personal_data\": {\
"id\": 0,\"code\": \
"person_code\",
\"first_name\": \"TEST_5\",
\"middle_name\": \"f\",
\"last_name\": \"t\",
\"sex\": \"h\",
\"language\": \"es\",
\"SSN\": \"98989898989\",
\"country_of_birth\": \"mx\",
\"email\": \"qwerty@hotmail.com\",
\"person_type_Id\": 1,
\"marital_status\": \"s\"},\"metadata\": null}



{  
    "operation_data":{  
       "lead":"bid"
    },
    "personal_data":{  
       "id":144,
       "code":null,
       "first_name":"MORENO",
       "middle_name":"GABRIELA GUADALUPE",
       "last_name":"GUTIERREZ",
       "sex":"M",
       "birth_date":"1991-06-07",
       "language":"es",
       "SSN":"",
       "country_of_birth":0,
       "email":"",
       "person_type_Id":"1",
       "marital_status":"0",
       "rfc":"fdgdfgdfg",
       "phone":null,
       "curp":"MOGG910607MDFRTB05",
       "addresses":[  
          {  
             "street":"PRIV VALDEPENAS 1 12nFRACC REAL TOLEDO 421 19nPACHUCA DE SOTO. HGO.",
             "ext":"",
             "intNumber":"12",
             "colony":"colonia",
             "country":0,
             "extNumber":"",
             "type":1,
             "operationType":"SAVE",
             "last_update_user_id":1,
             "register_user_id":1,
             "id":0
          }
       ]
    },
    "metadata":null
 } */