import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { DialogFrameComponent } from '../components/dialog-frame/dialog-frame.component';
import { DraggableDialog, DraggableDialogConfig } from '../models/draggable-dialog-config';
import { DialogOverlayComponent } from '../components/dialog-overlay/dialog-overlay.component';

@Injectable({
  providedIn: 'root'
})
export class DraggableDialogService {
  
  private _layerIndex: number = 0;
  private _dialogIndex: number = 0;

  overlays: {
    id: number,
    overlay: OverlayRef,
    overlayControl: ComponentRef<DialogOverlayComponent>
  }[] = [];

  constructor(private overlay: Overlay) { }

  createDialog(component: ComponentType<any>, config?: DraggableDialogConfig): DraggableDialog {
    let curOverlay: OverlayRef | null = null;
    let curOverlayControl: ComponentRef<DialogOverlayComponent> | null = null;
    if (config?.newLayer || this.overlays.length === 0) {
      const createdOverlay = this.createLayer();
      curOverlay = createdOverlay.overlay;
      curOverlayControl = createdOverlay.overlayControl;
    } else {
      curOverlay = this.overlays[this.overlays.length-1].overlay;
      curOverlayControl = this.overlays[this.overlays.length-1].overlayControl;
    }
    const dialog = curOverlayControl.instance.createDialog(component, this._dialogIndex, config);
    ++this._dialogIndex;
    return dialog;
  }

  closeDialog(dialogId: number): void {
    if (this.overlays.length > 0) {
      this.overlays[this.overlays.length-1].overlayControl.instance.closeDialog(dialogId);
    }
  }

  createLayer(): {id: number, overlay: OverlayRef, overlayControl: ComponentRef<DialogOverlayComponent>} {
    const curOverlay = this.overlay.create();
    const curOverlayControl = curOverlay.attach(new ComponentPortal(DialogOverlayComponent));
    curOverlayControl.instance.assignLayerId(this._layerIndex);
    this.overlays.push({id: this._layerIndex, overlay: curOverlay, overlayControl: curOverlayControl});
    const overlay = {
      id: this._layerIndex,
      overlay: curOverlay,
      overlayControl: curOverlayControl
    }
    ++this._layerIndex;
    return overlay;
  }

  removeLayer(layerId: number): void {
    let removedIndex: number | null = null;
    this.overlays.forEach((layer, index) => {
      if (layer.id === layerId) {
        layer.overlay.dispose();
        removedIndex = index;
      }
    });
    if (removedIndex !== null) {
      this.overlays.splice(removedIndex, 1);
    }
  }

  getCurrentLayerIndex(): number {
    return this._layerIndex;
  }

  getCurrentDialogIndex(): number {
    return this._dialogIndex;
  }
}
