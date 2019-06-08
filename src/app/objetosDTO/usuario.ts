export class Usuario {

    private user: string;
    private password: string;


    public getUser(): string {
        return this.user;
    }
    public setUser(value: string) {
        this.user = value;
    }

    public getPassword(): string {
        return this.password;
    }
    public setPassword(value: string) {
        this.password = value;
    }

    constructor() {

    }

}
