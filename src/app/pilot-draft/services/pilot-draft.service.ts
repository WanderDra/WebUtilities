import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PilotDraftService {

  tripsUpdateEvent$ = new EventEmitter();
  rankSubmitEvent$ = new EventEmitter();
  
  constructor() { }
}
