import { MatTableDataSource } from "@angular/material/table";
import { RATypeOfRequirement } from "../../constants/ra-general-constants";
import { RAForecastChartCell } from "../../models/ra-forecast-cell";

export class RAURChartUIParam {
    urChartData: MatTableDataSource<URChartRecordUI>;
    urChartHeaderColumns: string[];
}

export class URChartRecord {
    requirement: string;
    date: string;
    days: number;
    rsvPrd: string;
    typeOfRequirement: string;
    cvg: RAForecastChartCell;
}

export class URChartRecordUI extends URChartRecord {
    constructor(urChartRecord: URChartRecord) {
        super();
        Object.assign(this, urChartRecord);
    }
    typeOfRequirementType: RATypeOfRequirement;
    cellClass: string[];
}