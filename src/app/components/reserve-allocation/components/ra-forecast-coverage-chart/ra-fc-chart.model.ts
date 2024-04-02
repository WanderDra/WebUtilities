import { MatTableDataSource } from "@angular/material/table";
import { RAUserType } from "../../constants/ra-general-constants";
import { RAForecastChartCell } from "../../models/ra-forecast-cell";

export class RAForecastCoverageChartUIParam {
  chartUserType: RAUserType;
  requirementCountLegends: RAForecastChartCell[];
  coverageDifferencesLegends: RAForecastChartCell[];
  pilotLegends: RAForecastChartCell[];
  fcChartData: MatTableDataSource<FCChartRecord>;
  fcChartHeaderColumns: string[];
  fcChartDateHeaderColumns: string[];
  fcChartCellColumns: string[]
}

export class FCChartRecord {
  date: string;
  tripDateCells: RAForecastChartCell[];
}