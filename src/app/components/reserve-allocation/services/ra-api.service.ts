import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RA_BASES_TEST, RA_EQ_TEST, RA_RSV_PRD_TEST, RA_SEAT_TEST, RA_SIBA_TEST, RA_VIEW_AS_TEST } from '../constants/ra-test-constants';
import * as moment from 'moment';
import { RAUserType } from '../constants/ra-general-constants';

@Injectable({
  providedIn: 'root'
})
export class RaAPIService {

  readonly TEST_DELAY = 1000;

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
      uncoveredTripsDays: 7
    }).pipe(delay(this.TEST_DELAY))
  }

  getRAConfigs(): Observable<any> {
    return of({
      searchConfigs: {
        baseOptions: RA_BASES_TEST,
        minBidMonth: moment().utc().toISOString(),
        equipmentOptions: RA_EQ_TEST,
        seatOptions: RA_SEAT_TEST,
        rsvPrdOptions: RA_RSV_PRD_TEST,
        sibaOptions: RA_SIBA_TEST,
        userType: RAUserType.ADMIN,
        viewAsOptions: RA_VIEW_AS_TEST
      }
    }).pipe(delay(this.TEST_DELAY))
  }
}
