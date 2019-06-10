import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RazonesService {

  private productId: number;
    private activityStatus: string;
    private data: string;
    private secuence: number;
    private workflowId: number;
    private personId: number;
    private operationId: number;

    constructor() { }

    public getProductId(): number {
        return this.productId;
    }
    public setProductId(productId: number) {
        this.productId = productId;
    }

    public getActivityStatus(): string {
        return this.activityStatus;
    }
    public setActivityStatus(activityStatus: string) {
        this.activityStatus = activityStatus;
    }

    public getData(): string {
        return this.data;
    }
    public setData(data: string) {
        this.data = data;
    }

    public getSecuence(): number {
        return this.secuence;
    }
    public setSecuence(secuence: number) {
        this.secuence = secuence;
    }

    public getWorkflowId(): number {
        return this.workflowId;
    }
    public setWorkflowId(workflowId: number) {
        this.workflowId = workflowId;
    }

    public getPersonId(): number {
        return this.personId;
    }
    public setPersonId(personId: number) {
        this.personId = personId;
    }

    public getOperationId(): number {
        return this.operationId;
    }
    public setOperationId(operationId: number) {
        this.operationId = operationId;
    }

}
