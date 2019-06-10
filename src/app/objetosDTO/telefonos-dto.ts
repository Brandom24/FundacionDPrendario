export class TelefonosDto {

    private id: number;
    private numTel: number;
    private email: any;

    constructor() {}

    public getNumTel(): number {
        return this.numTel;
    }

    public setNumTel(numTel: number): void {
        this.numTel = numTel;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getEmail(): any {
        return this.email;
    }

    public setEmail(email: any): void {
        this.email = email;
    }

}