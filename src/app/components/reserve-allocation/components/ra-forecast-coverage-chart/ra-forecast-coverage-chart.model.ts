import { MatTableDataSource } from "@angular/material/table";
import { RAForecastCellType, RAUserType } from "../../constants/ra-general-constants";
import { IRACellConfig } from "./ra-forecast-coverage-chart.interfaces";

export class RAForecastChartCell {
    cellType: RAForecastCellType;
    cellClass: string = '';
    cellContent: string = '#';
    cellContentClass: string = '';
    discription: string = '';
    hideContent: boolean = false;
  
    // WIP
    constructor(config: IRACellConfig) {
        this.initCell(config);
    }
  
    /** Do cell property calculation */
    initCell(config: IRACellConfig): void {
      this.setCellClass(config.cellType);
      this.cellContent = config.cellContent;
      this.hideContent = config.hideContent;
    }
  
    private setCellClass(cellType: RAForecastCellType): void {
      switch (cellType) {
        case RAForecastCellType.FORECAST_EXCEED:
          this.cellClass = 'ra-cell-forecast-exceed';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Coverage exceeds Forecast';
          break;
        case RAForecastCellType.FORECAST_EQUAL:
          this.cellClass = 'ra-cell-forecast-equal';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Coverage equal to Forecast';
          break;
        case RAForecastCellType.FORECAST_SHORT:
          this.cellClass = 'ra-cell-forecast-short';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Coverage short of Forecast';
          break;
        case RAForecastCellType.OPENTIME_COUNT_INCLUDED:
          this.cellClass = 'ra-cell-open-time-count-included';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Open Time included in count';
          break;
        case RAForecastCellType.OPENTIME_COUNT_OVER_FORECAST:
          this.cellClass = 'ra-cell-open-time-count-over-forecast';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Open Time count > Forecast';
          break;
        case RAForecastCellType.ONLY_FORECAST:
          this.cellClass = 'ra-cell-only-forecast';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Only Forecast in count';
          break;
        case RAForecastCellType.NO_FORECAST_REQUIREMENT:
          this.cellClass = 'ra-no-forecast-requirement';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'No forecasted requirements';
          break;
        default:
      }
    }
  }

export class RAForecastCoverageChartUIParam {
  chartUserType: RAUserType;
  requirementCountLegends: RAForecastChartCell[];
  coverageDifferencesLegends: RAForecastChartCell[];
  pilotLegends: RAForecastChartCell[];
  fcChartData: MatTableDataSource<ForecastCoverageUIData>;
  fcChartHeaderColumns: string[];
  fcChartDateHeaderColumns: string[];
  fcChartCellColumns: string[]
}

export class ForecastCoverageUIData {
  date: string;
  tripDateCells: RAForecastChartCell[];
}