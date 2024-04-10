import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, retry } from 'rxjs/operators';
import { RA_BASES_TEST, RA_EQ_TEST, RA_RSV_PRD_TEST, RA_SEAT_TEST, RA_SIBA_TEST, RA_VIEW_AS_TEST } from '../constants/ra-test-constants';
import * as moment from 'moment';
import { RACellType, RATypeOfRequirement, RAUserType } from '../constants/ra-general-constants';
import { FCChartRecord } from '../components/ra-forecast-coverage-chart/ra-fc-chart.model';
import { RASPilotInfo, RASTripInfo, ReserveAllocationSummaryResponse, ServerRASCellType, ServerRASTypeOfRequirement } from '../models/ra-forecast-coverage';
import { RAForecastCoverageCell } from '../models/ra-forecast-cell';
import { IRAForecastCoverageConfig } from '../interfaces/ra-config.interfaces';
import { IRACoverageDetail } from '../popups/ra-coverage-detail-popup/ra-cd.interface';
import { RACoverageDetailPilot, RACoverageDetailTrip } from '../popups/ra-coverage-detail-popup/ra-cd.model';

@Injectable({
  providedIn: 'root'
})
export class RaAPIService {

  readonly TEST_DELAY = 0;

  constructor() { }

  // Test
  getSearchResponse(): Observable<any> {
    return of({
      pilotInfo: {
        firstName: 'Smallenburg III',
        lastName: 'Alexander',
        base: 'MEM',
        equipment: '67',
        seat: 'CAP',
        pilotId: '123456'
      },
      uncoveredTripsAmount: 6,
      uncoveredTripsDays: 7,
      forecastCoverage: [],
      uncoveredRequirements: [],
      reservePilotCalendar: [],
    }).pipe(delay(this.TEST_DELAY))
  }

  getRAConfigs(): Observable<any> {
    return of({
      searchConfigs: {
        baseOptions: RA_BASES_TEST,
        minBidMonth: moment().utc().startOf('month').toISOString(),
        equipmentOptions: RA_EQ_TEST,
        seatOptions: RA_SEAT_TEST,
        rsvPrdOptions: RA_RSV_PRD_TEST,
        sibaOptions: RA_SIBA_TEST,
        userType: RAUserType.ADMIN,
        viewAsOptions: RA_VIEW_AS_TEST
      }
    }).pipe(delay(this.TEST_DELAY))
  }

  getReserveAllocationSummary(request: unknown): Observable<FCChartRecord[]> {
    const response = new Observable<ReserveAllocationSummaryResponse[]>();
    return response.pipe(retry(3), map(
      res => {
        const fccChartRecords: FCChartRecord[] = [];
        res.forEach(responseObj => {
          // Trip Count Row
          const uiTripCountObj = new FCChartRecord();
          uiTripCountObj.date = responseObj.rsvDate;
          uiTripCountObj.type = responseObj.type;
          uiTripCountObj.tripDateCells = [];
          responseObj.reserveAllocationDayDetails?.forEach(raDay => {
            const uiTripCountCellConfig: IRAForecastCoverageConfig = {
              cellType: this._getRACellType(raDay.rasTripCount.type),
              cellContent: '' + raDay.rasTripCount.count,
              raCoverageDetail: this._getRACoverageDetail(raDay.rasTripInfos, raDay.rasPilotInfos)
            };
            const uiTripCountCell = new RAForecastCoverageCell(uiTripCountCellConfig);
            uiTripCountObj.tripDateCells.push(uiTripCountCell);
          });
          fccChartRecords.push(uiTripCountObj);
          // Reserve Count Row
          const uiReserveCountObj = new FCChartRecord();
          uiReserveCountObj.date = responseObj.rsvDate;
          uiReserveCountObj.type = responseObj.type;
          uiReserveCountObj.tripDateCells = [];
          responseObj.reserveAllocationDayDetails?.forEach(raDay => {
            const uiReserveCellConfig: IRAForecastCoverageConfig = {
              cellType: this._getRACellType(raDay.reserveCountType),
              cellContent: '' + raDay.reserveCount,
              raCoverageDetail: this._getRACoverageDetail(raDay.rasTripInfos, raDay.rasPilotInfos)
            };
            const uiReserveCountCell = new RAForecastCoverageCell(uiReserveCellConfig);
            uiReserveCountObj.tripDateCells.push(uiReserveCountCell);
          });
          fccChartRecords.push(uiReserveCountObj);
        });
        return fccChartRecords;
      }
    ));
  }

  private _getRACellType(typeFromServer: ServerRASCellType): RACellType {
    switch (typeFromServer) {
      // WIP
      default:
        return RACellType.ONLY_FORECAST;
    }
  }

  private _getRACoverageDetail(tripsFromServer: RASTripInfo[], pilotFromServer: RASPilotInfo[]): IRACoverageDetail {
    const openTimeTrips: RACoverageDetailTrip[] = [];
    const openStandByTrips: RACoverageDetailTrip[] = [];
    const projectedTrips: RACoverageDetailTrip[] = [];
    const forecastTrips: RACoverageDetailTrip[] = [];
    const allTrips: RACoverageDetailTrip[] = [];
    const pilots: RACoverageDetailPilot[] = [];

    tripsFromServer?.forEach(trip => {
      const uiTripObj = new RACoverageDetailTrip();
      uiTripObj.tripName = trip.tripKey.number;
      uiTripObj.tripType = this._getRATripType(trip.type);
      if (trip.pilotInfo) {
        uiTripObj.pilot = {
          pilotId: trip.pilotInfo.pilotid,
          pilotName: this._getPilotName(trip.pilotInfo.firstname, trip.pilotInfo.lastname),
          pilotType: null
        };
      } else {
        uiTripObj.pilot = null;
      }
      allTrips.push(uiTripObj);      
      switch (uiTripObj.tripType) {
        // WIP
        case RATypeOfRequirement.OPEN_TIME:
          openTimeTrips.push(uiTripObj);
          break;
        case RATypeOfRequirement.OPEN_STAND_BY:
          openStandByTrips.push(uiTripObj);
          break;
        case RATypeOfRequirement.PROJECTED_OPEN_TIME:
          projectedTrips.push(uiTripObj);
          break;
        case RATypeOfRequirement.FORECAST_TRIP:
          forecastTrips.push(uiTripObj);
          break;
      }
    });

    pilotFromServer?.forEach(pilot => {
      const uiPilotObj = new RACoverageDetailPilot();
      uiPilotObj.pilotId = pilot.pilotid;
      uiPilotObj.pilotName = this._getPilotName(pilot.firstname, pilot.lastname);
      uiPilotObj.pilotType = pilot.reserveType;
      pilots.push(uiPilotObj);
    })

    const uiObj: IRACoverageDetail = {
      totalTrips: tripsFromServer.length,
      openTimeTrips: openTimeTrips.length,
      openStandbyTrips: openStandByTrips.length,
      projectedTrips: projectedTrips.length,
      forecast: forecastTrips.length, // WIP
      totalForecast: forecastTrips.length,
      trips: allTrips,
      pilots: pilots
    }
    
    return uiObj;
  }

  private _getRATripType(typeFromServer: ServerRASTypeOfRequirement): RATypeOfRequirement {
    // WIP
    switch (typeFromServer) {
      case ServerRASTypeOfRequirement.FORECAST_TRIP:
        return RATypeOfRequirement.FORECAST_TRIP;
      case ServerRASTypeOfRequirement.OPEN_TIME:
        return RATypeOfRequirement.OPEN_TIME;
      case ServerRASTypeOfRequirement.OPEN_STAND_BY:
        return RATypeOfRequirement.OPEN_STAND_BY;
      case ServerRASTypeOfRequirement.PROJECTED_OPEN_TIME:
        return RATypeOfRequirement.PROJECTED_OPEN_TIME;
      default:
        return null;
    }
  }

  private _getPilotName(firstname: string, lastName: string, midName?: string, affix?: string): string {
    const pilotName: string[] = [];
    if (firstname) {
      pilotName.push(firstname);
    }
    if (midName) {
      pilotName.push(midName);
    }
    if (lastName) {
      pilotName.push(lastName);
    }
    const fullname = pilotName.join(', ') + ' ' + affix;
    return fullname;
  }
}