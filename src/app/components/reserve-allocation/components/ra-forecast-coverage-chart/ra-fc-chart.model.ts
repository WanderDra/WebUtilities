import { MatTableDataSource } from "@angular/material/table";
import { RAUserType } from "../../constants/ra-general-constants";
import { RAChartCell, RAForecastCoverageCell } from "../../models/ra-forecast-cell";

export class RAForecastCoverageChartUIParam {
  chartUserType: RAUserType;
  requirementCountLegends: RAChartCell[];
  coverageDifferencesLegends: RAChartCell[];
  pilotLegends: RAChartCell[];
  fcChartData: MatTableDataSource<FCChartRecord>;
  fcChartHeaderColumns: string[];
  fcChartDateHeaderColumns: string[];
  fcChartCellColumns: string[]
}

export class FCChartRecord {
  date: string;
  tripDateCells: RAForecastCoverageCell[];
}