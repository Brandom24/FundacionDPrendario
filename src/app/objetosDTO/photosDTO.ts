export class PhotosDTO {

    private docCode1 = '';
    private docCode2 = '';
    private operID1: string;
    private operID2: string;
    private activityStatus2 = '';
    private activityStatus1 = '';
    private lat: string;
    private lng: string;

    public getDocCode1() {
        return this.docCode1;
    }
    public setDocCode1(value) {
        this.docCode1 = value;
    }

    public getDocCode2() {
        return this.docCode2;
    }
    public setDocCode2(value) {
        this.docCode2 = value;
    }
    public getOperID1(): string {
        return this.operID1;
    }
    public setOperID1(value: string) {
        this.operID1 = value;
    }
    public getOperID2(): string {
        return this.operID2;
    }
    public setOperID2(value: string) {
        this.operID2 = value;
    }
    public getActivityStatus2() {
        return this.activityStatus2;
    }
    public setActivityStatus2(value) {
        this.activityStatus2 = value;
    }
    public getActivityStatus1() {
        return this.activityStatus1;
    }
    public setActivityStatus1(value) {
        this.activityStatus1 = value;
    }
    public getLat(): string {
        return this.lat;
    }
    public setLat(value: string) {
        this.lat = value;
    }
    public getLng(): string {
        return this.lng;
    }
    public setLng(value: string) {
        this.lng = value;
    }

}
