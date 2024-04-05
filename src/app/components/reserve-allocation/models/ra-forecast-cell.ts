import { RACellType } from "../constants/ra-general-constants";
import { IRACellConfig } from "../interfaces/ra-config.interfaces";

export class RAChartCell {
    cellType: RACellType;
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
  
    private setCellClass(cellType: RACellType): void {
      switch (cellType) {
        case RACellType.FORECAST_EXCEED:
          this.cellClass = 'ra-cell-forecast-exceed';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Coverage exceeds Forecast';
          break;
        case RACellType.FORECAST_EQUAL:
          this.cellClass = 'ra-cell-forecast-equal';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Coverage equal to Forecast';
          break;
        case RACellType.FORECAST_SHORT:
          this.cellClass = 'ra-cell-forecast-short';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Coverage short of Forecast';
          break;
        case RACellType.OPENTIME_COUNT_INCLUDED:
          this.cellClass = 'ra-cell-open-time-count-included';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Open Time included in count';
          break;
        case RACellType.OPENTIME_COUNT_OVER_FORECAST:
          this.cellClass = 'ra-cell-open-time-count-over-forecast';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Open Time count > Forecast';
          break;
        case RACellType.ONLY_FORECAST:
          this.cellClass = 'ra-cell-only-forecast';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Only Forecast in count';
          break;
        case RACellType.NO_FORECAST_REQUIREMENT:
          this.cellClass = 'ra-no-forecast-requirement';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'No forecasted requirements';
          break;
        case RACellType.FORECAST_TRIP:
          this.cellClass = 'ra-forecast-trip';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Forecast Trip';
          break;
        case RACellType.OPENTIME_TRIP:
          this.cellClass = 'ra-opentime-trip';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Open Time Trip';
          break;
        case RACellType.PROJECTED_OPEN_TRIP:
          this.cellClass = 'ra-projected-open-trip';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Projected Open Trip';
          break;
        case RACellType.ASSIGNED_TRIP:
          this.cellClass = 'ra-assigned-trip';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Assigned Trip';
          break;
        case RACellType.NO_TRIP_ASSIGNMENT:
          this.cellClass = 'ra-no-trip-assignment';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'No Trip Assignment';
          break;
        case RACellType.PILOT_UNAVAILABLE:
          this.cellClass = 'ra-pilot-unavailable';
          this.cellContentClass = 'ra-cell-content-forecast';
          this.discription = 'Pilot Unavailable';
          break;
        default:
      }
    }
  }