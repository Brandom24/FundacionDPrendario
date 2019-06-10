export class JsonMetadata{
    constructor(
        public accuracy: number,
        public deviceInfo: string,
        public latutide: number,
        public longitude: number,
        public timeZoneId: number,
        public userId: number,
    ){}
}