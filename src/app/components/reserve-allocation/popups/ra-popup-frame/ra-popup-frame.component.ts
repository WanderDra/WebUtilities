import { Component, ContentChild, Input, OnInit } from '@angular/core';

@Component({
  selector: 'crew-nav-ra-popup-frame',
  templateUrl: './ra-popup-frame.component.html',
  styleUrls: ['./ra-popup-frame.component.scss']
})
export class RaPopupFrameComponent implements OnInit {

  @Input('pointer-side') pointerSide: string; // left / right

  @ContentChild(Component) contentRef: Component; 

  constructor() { }

  ngOnInit(): void {
    
  }

}
