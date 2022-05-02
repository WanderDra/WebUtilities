import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SessionResultResponse } from '../models/session-result';

@Injectable({
  providedIn: 'root'
})
export class SessionResultService {

  constructor() { }

  getSessionResult(): Observable<SessionResultResponse[]> {
    const testData = new SessionResultResponse();
    testData.seniorityNbr = '012345678';
    testData.pilotName = 'Steven Smallenburger';
    testData.empId = '1234567890';
    testData.tripsOffered = 2;
    testData.contactOutcome = 'Decline All Trips';
    testData.tripLegalities = [
      {tripNbr: '8769', legalityCheckOutcome: 'Available for Draft', pilotSelection: 'Trip Accepted'},
      {tripNbr: '48', legalityCheckOutcome: 'Bypass Due to Proximity', pilotSelection: ''},
      {tripNbr: '209', legalityCheckOutcome: 'Available for Draft', pilotSelection: 'Trip Declined'},
      {tripNbr: '1222', legalityCheckOutcome: 'No Open Seat', pilotSelection: ''}
    ];
    testData.outcomes = [
      {phoneNbr: '1234567890', contactOutcome: 'Speak to CRS'},
      {phoneNbr: '2345678901', contactOutcome: 'No Call Attempt'},
      {phoneNbr: 'crs', contactOutcome: 'Declined All Trips'}
    ];
    testData.isCallAttempting = false;
    testData.isRecordResponseAvailable = false;

    const testData2 = new SessionResultResponse();
    testData2.seniorityNbr = '012345678';
    testData2.pilotName = 'Cari Papadapolous';
    testData2.empId = '1234567890';
    testData2.tripsOffered = 2;
    testData2.contactOutcome = 'Speak to CRS';
    testData2.tripLegalities = [
      {tripNbr: '8769', legalityCheckOutcome: 'No Open Seat', pilotSelection: ''},
      {tripNbr: '48', legalityCheckOutcome: 'Legality Issues', pilotSelection: ''},
      {tripNbr: '209', legalityCheckOutcome: 'Available for Draft', pilotSelection: 'Trip Declined'},
      {tripNbr: '1222', legalityCheckOutcome: 'No Open Seat', pilotSelection: ''}
    ];
    testData2.outcomes = [
      {phoneNbr: '1234567890', contactOutcome: 'Speak to CRS'},
      {phoneNbr: '2345678901', contactOutcome: 'No Call Attempt'},
      {phoneNbr: 'crs', contactOutcome: 'Declined All Trips'}
    ];
    testData2.isCallAttempting = true;
    testData.isRecordResponseAvailable = true;
    
    return of([testData, testData2]);
  }
}
