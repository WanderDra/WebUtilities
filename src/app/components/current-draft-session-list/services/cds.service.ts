import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { LegalityOutcomeResponse, SessionItem, SessionDataResponse, TripResponse } from '../models/current-draft-session-list';

@Injectable({
  providedIn: 'root'
})
export class CDSService {

  constructor() { }

  getSessionData(): Observable<SessionDataResponse[]> {
    const testData = new SessionDataResponse();
    testData.sessionId = '0001234';
    testData.status = 1; //Assume: 0 run 1 waiting 2 paused
    testData.tripCount = 12;
    testData.startTime = moment();
    testData.base = 'MEM';
    testData.eqNbr = 67;
    testData.seat = 'CAP';
    testData.tripAssigned = 6;
    testData.tripAllMatch = 13;
    testData.pilotAttempted = 36;
    testData.pilotAllMatch = 1354;
    testData.estTime = 137;
    const testTrips: TripResponse[] = [
      {id: '8769', date: moment(), status: 'Assigned', info: '1234567890'},
      {id: '48', date: moment(), status: 'Open', info: undefined},
      {id: '209', date: moment(), status: 'Open', info: undefined},
      {id: '1222', date: moment(), status: 'Assigned', info: '1234567890'}
    ];
    const testLegalities: LegalityOutcomeResponse[] = [
      {id: '0', percentage: 0, amount: 1, info: 'Available for Draft / Accept'},
      {id: '1', percentage: 7, amount: 659, info: 'Available for Draft / Decline'},
      {id: '2', percentage: 0, amount: 0, info: 'Bypass Due to Proximitily'},
      {id: '3', percentage: 4, amount: 345, info: 'No Open Seat'},
      {id: '4', percentage: 88, amount: 7805, info: 'Legality Issues'}
    ];
    testData.trips = testTrips;
    testData.legalities = testLegalities;
    const testData1 = testData;
    const testData2 = { ...testData };
    const testData3 = { ...testData };
    testData2.startTime = moment().add(5, 'm')
    testData3.startTime = undefined;
    return of([testData1, testData2, testData3]);
  }

}
