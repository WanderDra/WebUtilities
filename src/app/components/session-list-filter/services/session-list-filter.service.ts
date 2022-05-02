import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SessionListFilterSearchCriteria } from '../models/session-list-filter';

@Injectable({
  providedIn: 'root'
})
export class SessionListFilterService {

  constructor() { }

  getSessionListFilterSearchCriteria(): Observable<SessionListFilterSearchCriteria> {
    const criteria = new SessionListFilterSearchCriteria();
    criteria.base = [
      'MEM',
      'ABC',
      'DEF',
      'JKL'
    ];
    criteria.eqNbr = [
      '67',
      '66',
      '737',
      '57'
    ];
    criteria.seat = [
      'CAP',
      'F/O'
    ]
    return of(criteria);
  }

}
