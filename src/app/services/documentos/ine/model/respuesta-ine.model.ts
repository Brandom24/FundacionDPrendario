export class RespuestaIne{
    constructor(
    public	resultOK: boolean,
    public errorMessage: string,
    public message: string,
    public id: string,
    public operationID: string,
    public code: string,
    public initial_answer: string,
    public finish: string,
    public final_answer: string

    ){ }
}