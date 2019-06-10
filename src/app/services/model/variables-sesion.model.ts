export class VariablesSesion {
    constructor(
        public operationId: number,
        public code: string,
        public systemCode: number,
        public personId: number,
        public activityStatus: string,
        public secuenceId: number,
        public productId: number,
        public workflowId: number
    ) {}
}
