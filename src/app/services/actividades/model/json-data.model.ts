import { JsonInnerData } from './json-inner-data.model';

export class JsonData {
    constructor(
        public productId: number,
        public code?: string,
        public activityStatus?: string,
        public activityValue?: string,
        public data?: string,
        public secuence?: number,
        public workflowId?: number,
        public personId?: number
    ) {}
}
