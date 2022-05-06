import { EventEmitter, Injectable, Injector, StaticProvider, TemplateRef, Type } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PopupDialog, PopupInputValue } from '../components/draggable-popup/draggable-popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  id = 0;

  currentLayer = 0;

  popupList$ = new BehaviorSubject<Map<number, PopupDialog>>(new Map());
  popupListStructure$ = new BehaviorSubject<Map<number, Set<number>>>(new Map())

  popupEvent$ = new EventEmitter<{eventName: string, context?: any}>();

  constructor( private injector: Injector ) { }

  createPopup(component: Type<any>, position?: {x: number, y: number}, provider?: Type<any>, value?: any, newLayer?: boolean): number {
    const popupInputValue: PopupInputValue = {
      id: this.id,
      ...value
    }
    let injector: Injector = Injector.create({providers: [], parent: this.injector});
    if (provider) {
      injector = Injector.create({providers: [{provide: provider, useValue: popupInputValue}], parent: this.injector});
    }
    const returnData = new BehaviorSubject<any>(null);
    const updatedPopupList = this.popupList$.value;
    const curPosition = {x: 100, y: 100};
    if (position) {
      curPosition.x = position.x * 0.6;
      curPosition.y = position.y * 0.6;
    }
    const newPopup = {id: this.id, component, position: curPosition, injector, data: returnData};
    updatedPopupList.set(this.id, newPopup);
    this.popupList$.next(updatedPopupList);

    if (newLayer) {
       this._createPopupInNewLayer(newPopup);
    } else {
      this._createPopupInCurrentLayer(newPopup);
    }
    return this.id++;
  }

  removePopup(id: number): void {
    const deletedPopup = this.getPopupItem(id);
    const layerStructure = this.popupListStructure$.value;    
    layerStructure.get(this.currentLayer).delete(deletedPopup.id);
    if (layerStructure.get(this.currentLayer).size === 0) {
      layerStructure.delete(this.currentLayer);
      --this.currentLayer;
    }
    this.popupListStructure$.next(layerStructure);
    this.popupList$.value.delete(id);
    this.popupList$.next(this.popupList$.value);
  }

  getPopupItem(id: number): PopupDialog {
    return this.popupList$.value.get(id);
  }

  getPopupData(id: number): any | null {
    const popupItem = this.getPopupItem(id);
    if (popupItem) {
      const data = popupItem.data;
      if (data) {
        return this.popupList$.value.get(id).data;
      }
    }
    return null;
  }

  getPopupPosition(id: number): {x: number, y:number} {
    const popupItem = this.getPopupItem(id);
    return popupItem.position;
  }

  _createPopupInNewLayer(popup: PopupDialog): void {
    ++this.currentLayer;
    const newLayer: Set<number> = new Set();
    newLayer.add(popup.id);
    const currentStructure = this.popupListStructure$.value;
    currentStructure.set(this.currentLayer, newLayer);
    this.popupListStructure$.next(currentStructure);
  }

  _createPopupInCurrentLayer(popup: PopupDialog): void {
    const currentStructure = this.popupListStructure$.value
    if (currentStructure.get(this.currentLayer)) {
      currentStructure.get(this.currentLayer).add(popup.id);
    } else {
      const newLayer: Set<number> = new Set();
      newLayer.add(popup.id);
      currentStructure.set(this.currentLayer, newLayer);
    }
    this.popupListStructure$.next(currentStructure);
  }

}
