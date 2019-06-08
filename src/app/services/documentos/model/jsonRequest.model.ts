export class JsonRequest{
    constructor(
        public docCode1: string,
        public operID1: string,
        public activityStatus1: string,
        public lat: string="",
        public lng: string="",
        public docCode2?: string,
        public operID2?: string,
        public activityStatus2?: string
    ){}
}