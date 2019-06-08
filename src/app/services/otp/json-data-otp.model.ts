
export class JsonDataOtp{
    constructor(){ }
    
    private number: string;
    private otp: string;

    public getNumber(): string
    {
        return this.number;
    }

    public setNumber(number: string): void {
        this.number = number;
    }

    public getOtp(): string {
        return this.otp;
    }

    public setOtp(otp: string): void {
        this.otp = otp;
    }




}