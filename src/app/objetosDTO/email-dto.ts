export class EmailDto {

    private id: number;
    private email: any;

    constructor() {}

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