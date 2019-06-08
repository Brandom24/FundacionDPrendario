import { DataFile } from '../services/documentos/model/data-file.model';

export class FormatoDataFile{
    constructor(){}

    formatearDataFile(dataFile:DataFile): string
    {
        let dataFileString = JSON.stringify(dataFile);
        dataFileString = dataFileString.replace("bid_Nombre","bid:Nombre");
        dataFileString = dataFileString.replace("bid_PrimerApellido","bid:PrimerApellido");
        dataFileString = dataFileString.replace("bid_SegundoApellido","bid:SegundoApellido");
        dataFileString = dataFileString.replace("bid_IDENTIFICACION","bid:IDENTIFICACION");
        dataFileString = dataFileString.replace("bid_Fecha","bid:Fecha");
        dataFileString = dataFileString.replace("bid_TipoID","bid:TipoID");
        dataFileString = dataFileString.replace("bid_ScanId","bid:ScanId");
        return dataFileString;
    }
}