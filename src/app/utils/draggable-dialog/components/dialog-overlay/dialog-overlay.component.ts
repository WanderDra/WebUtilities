import { Component, ComponentRef, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { DraggableDialog, DraggableDialogConfig } from '../../models/draggable-dialog-config';
import { CdkPortalOutletAttachedRef, ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { DraggableDialogData } from '../../models/draggable-dialog-data';
import { DraggableDialogService } from '../../services/draggable-dialog.service';
import { CdkDrag, CdkDragEnd, Point } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dialog-overlay',
  templateUrl: './dialog-overlay.component.html',
  styleUrls: ['./dialog-overlay.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogOverlayComponent implements OnInit {

  windowRef: Window;
  layerId: number;
  dialogs = new Map<number, DraggableDialog>();
  trackById = (dialog) => dialog.key;

  constructor(
    private injector: Injector,
    private draggableDialog: DraggableDialogService) { 
    this.windowRef = window;
  }

  ngOnInit(): void {
  }

  assignLayerId(layerId: number): void {
    this.layerId = layerId;
  }

  createDialog(component: ComponentType<any>, dialogIndex: number, config?: DraggableDialogConfig): DraggableDialog {
    let dialogConfig = new DraggableDialogConfig();
    if (config) {
      dialogConfig = { ...dialogConfig, ...config };
    }
    config = dialogConfig;
    const dialogData = new DraggableDialogData();
    dialogData.id = dialogIndex;
    dialogData.data = config.data;
    dialogData.overlay = this;
    const injector = Injector.create({providers: [{provide: DraggableDialogData, useValue: dialogData}], parent: this.injector});
    const componentPortal = new ComponentPortal(component, null, injector);
    const dialog = new DraggableDialog();
    dialog.componentPortal = componentPortal;
    dialog.config = config;
    this.dialogs.set(dialogIndex, dialog);
    return dialog;
  }

  closeDialog(dialogId: number): void {
    const afterCloseCB = this.dialogs.get(dialogId).config.afterCloseCallback;
    this.dialogs.delete(dialogId);
    if (this.dialogs.size === 0) {
      this.draggableDialog.removeLayer(this.layerId);
    }
    if (afterCloseCB) {
      afterCloseCB(dialogId);
    }
  }

  onDragEnded(event: CdkDragEnd, dialog: DraggableDialog) {
    const dialogHeight = event.source.getRootElement().offsetHeight;
    const dialogWidth = event.source.getRootElement().offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const dialogPos = event.source.getFreeDragPosition();
    const restrictedPos = {...dialogPos};

    const leftBorder = 0 - dialogWidth * 0.9;
    const rightBorder = windowWidth - dialogWidth * 0.2;
    const topBorder = 100;
    const bottomBorder = windowHeight - dialogHeight * 0.1;

    if (dialogPos.x < leftBorder) {
      restrictedPos.x = leftBorder;
    }
    if (dialogPos.x > rightBorder) {
      restrictedPos.x = rightBorder;
    }
    if (dialogPos.y < topBorder) {
      restrictedPos.y = topBorder;
    }
    if (dialogPos.y > bottomBorder) {
      restrictedPos.y = bottomBorder;
    }
    dialog.config.position = restrictedPos;
  }

  onDialogAttached(ref: CdkPortalOutletAttachedRef, dialogId: number): void {
    const dialog = this.dialogs.get(dialogId);
    dialog.setComponentRef(ref as ComponentRef<any>);
    if (!dialog.config.position.x) {
      dialog.getComponentRef().subscribe(
        ref => {
          const centerPos = this._getCenterPosition(ref);
          dialog.config.position = {...centerPos};
        }
      );
    }
  }

  private _getCenterPosition(ref: CdkPortalOutletAttachedRef): Point {
    const dialogRef = ref as ComponentRef<any>;
    const dialogHeight = dialogRef.location.nativeElement.offsetHeight;
    const dialogWidth = dialogRef.location.nativeElement.offsetWidth;
    return {x: window.innerWidth * 0.5 - dialogWidth * 0.5, y: window.innerHeight * 0.5 - dialogHeight * 0.5};
  }
}
