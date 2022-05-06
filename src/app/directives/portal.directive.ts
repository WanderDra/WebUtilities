import { Directive, Input, TemplateRef } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { PortalOutletDirective } from './portal-outlet.directive';

@Directive({
  selector: '[appPortal]'
})
export class PortalDirective {
  @Input() outlet: string;

  constructor(private portalService: PortalService, private templateRef: TemplateRef<any>) {}

  ngAfterViewInit(): void {
    const outlet: PortalOutletDirective = this.portalService.outlets[this.outlet];
    outlet.viewContainerRef.clear();
    outlet.viewContainerRef.createEmbeddedView(this.templateRef);
  }
}
