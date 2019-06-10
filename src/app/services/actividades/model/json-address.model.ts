export class JsonAddress{
    constructor(
        public street: string,
        public ext: string,
        public intNumber: string,
        public colony: string,
        public city: number,
        public country: number,
        public zipCode: string,
        public extNumber?: string,
        public town?: number,
        public state?: number,
        public type?: number,
        public operationType?: string,
        public last_update_user_id?: number,
        public register_user_id?: number,
        public id?: number
    ){}
}