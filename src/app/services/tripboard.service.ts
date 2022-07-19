import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GetTripOfferedRequest, GetTripOfferedResponse, TripPreferencesRequest, TripPreferencesResponse } from '../models/tripboard';

@Injectable({
  providedIn: 'root'
})
export class TripboardService {

  constructor() { }

  getTripOffered(request: GetTripOfferedRequest): Observable<GetTripOfferedResponse> {
    const testData = new GetTripOfferedResponse();
    return of(testData);
  }

  submitTripPreferences(request: TripPreferencesRequest): Observable<TripPreferencesResponse> {
    const response = new TripPreferencesResponse();
    return of(response);
  }

}
