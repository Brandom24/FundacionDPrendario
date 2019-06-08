export class Result{
    constructor(
        public timestamp: string,
        public status: number,
        public error: string,
        public message: string,
        public path: string
    ){}
}