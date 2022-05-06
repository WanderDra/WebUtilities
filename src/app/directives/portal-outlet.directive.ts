import { Directive, Input, ViewContainerRef } from '@angular/core';
import { PortalService } from '../services/portal.service';

@Directive({
  selector: '[appPortalOutlet]'
})
export class PortalOutletDirective {

  @Input() appPortalOutlet: string;

  constructor(private portalService: PortalService, public viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.portalService.registerOutlet(this);
  }

}
