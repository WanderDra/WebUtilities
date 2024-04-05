import { MatTableDataSource } from "@angular/material/table";
import { RAChartCell } from "../../models/ra-forecast-cell";

export class RARPCUIParam {
    legends: RAChartCell[];
    rpcChartData: MatTableDataSource<RPCChartRecord>;
    dateHeaderArray: string[];
    bidMonthEndDates: string[];
    rpcChartColumns: string[];
}

export class RPCChartRecord {
    pilotId: string;
    cells: RPCChartCell[];
}

export class Trip {
    length: number;
    tripNbr: string;
    tripType: string;
}

export class RPCChartCell {
    trip: Trip;
    cell: RAChartCell;
    mergedByPreviousCell: boolean;  // Set current cell to display: none when merging cells
}