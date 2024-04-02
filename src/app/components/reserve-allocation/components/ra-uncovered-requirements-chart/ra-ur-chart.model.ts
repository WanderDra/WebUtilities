import { MatTableDataSource } from "@angular/material/table";
import { IRACellConfig } from "../../interfaces/ra-config.interfaces";

export class RAURChartUIParam {
    urChartData: MatTableDataSource<URChartRecord>;
}

export class URChartRecord {
    requirement: string;
    date: string;
    days: number;
    rsvPrd: string;
    typeOfRequirement: string;
    cvg: IRACellConfig;
}