import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from './services/icon-registry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'WebUtilities';

  constructor (
    private iconRegistry: IconRegistryService
  ) {}

  ngOnInit(): void {
    this.iconRegistry.init();  
  }
}
