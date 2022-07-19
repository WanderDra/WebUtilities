import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTripOfferedRequest, TripPreferencesRequest, TripPreferencesResponse } from 'src/app/models/tripboard';
import { TripboardService } from 'src/app/services/tripboard.service';
import { TBBoardInfo, TripCard } from '../models/tb-board';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TbBoardService {

  constructor(private tbService: TripboardService) { }

  getTripOffered(request: GetTripOfferedRequest): Observable<TBBoardInfo> {
    return this.tbService.getTripOffered(request).pipe(map(response => {
      const info = new TBBoardInfo();
      info.pilotNbr = response.pilotNbr;
      info.sessionRefNumber = response.sessionRefNumber;
      info.tripcards = response.vccTripsOffered.map(trip => {
        const tripcard = new TripCard();
        // Do Mapping Here
        return tripcard;
      });
      return info;
    }))
  }

  submitTripPreferences(request: TripPreferencesRequest): Observable<TripPreferencesResponse> {
    return this.tbService.submitTripPreferences(request);
  }
  
}
