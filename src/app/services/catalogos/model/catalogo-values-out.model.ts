export class CatalogoValuesOut{
    constructor(
        public id_catalogue: number,
        public name: string,
        public description: string,
        public dependency: string,
        public id_value: number
    ){}
}