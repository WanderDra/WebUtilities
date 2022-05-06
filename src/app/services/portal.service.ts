import { Injectable } from '@angular/core';
import { PortalOutletDirective } from '../directives/portal-outlet.directive';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  outlets = new Map<string, PortalOutletDirective>();

  registerOutlet(outlet: PortalOutletDirective) {
    this.outlets[outlet.appPortalOutlet] = outlet;
  }
}
