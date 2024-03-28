import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {

  constructor( 
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {  
  }

  init() {
    this.matIconRegistry.addSvgIcon(
      `not_started`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/not_started_FILL0_wght400_GRAD0_opsz48.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'stop_circle',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/stop_circle_FILL0_wght400_GRAD0_opsz48.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'phone_in_talk',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/phone_in_talk_FILL1_wght400_GRAD0_opsz24.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'timer',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/timer_FILL0_wght700_GRAD200_opsz48.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'smartphone',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/smartphone_FILL1_wght700_GRAD0_opsz48.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'texting',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/texting_logo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'info',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/info_FILL0_wght400_GRAD0_opsz24.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'error',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/error_FILL0_wght400_GRAD0_opsz24.svg')
    );
  }
}
