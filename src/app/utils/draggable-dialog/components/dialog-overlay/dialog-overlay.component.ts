import { Component, ComponentRef, Injector, OnInit } from '@angular/core';
import { DraggableDialog, DraggableDialogConfig } from '../../models/draggable-dialog-config';
import { CdkPortalOutletAttachedRef, ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { DraggableDialogData } from '../../models/draggable-dialog-data';
import { DraggableDialogService } from '../../services/draggable-dialog.service';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dialog-overlay',
  templateUrl: './dialog-overlay.component.html',
  styleUrls: ['./dialog-overlay.component.scss']
})
export class DialogOverlayComponent implements OnInit {

  windowRef: Window;
  layerId: number;
  dialogs = new Map<number, DraggableDialog>();
  dialogIndex: number = 0;

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

  createDialog(component: ComponentType<any>, config?: DraggableDialogConfig): DraggableDialog {
    if (!config) {
      config = new DraggableDialogConfig();
    }
    const dialogData = new DraggableDialogData();
    dialogData.id = this.dialogIndex;
    dialogData.data = config.data;
    dialogData.overlay = this;
    const injector = Injector.create({providers: [{provide: DraggableDialogData, useValue: dialogData}], parent: this.injector});
    const componentPortal = new ComponentPortal(component, null, injector);
    const dialog = new DraggableDialog();
    dialog.componentPortal = componentPortal;
    dialog.config = config;
    this.dialogs.set(this.dialogIndex, dialog);
    ++this.dialogIndex;
    return dialog;
  }

  closeDialog(dialogId: number): void {
    this.dialogs.delete(dialogId);
    if (this.dialogs.size === 0) {
      this.draggableDialog.removeLayer(this.layerId);
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
    if (dialog.config.setCenter) {
      const dialogRef = ref as ComponentRef<any>;
      const dialogHeight = dialogRef.location.nativeElement.offsetHeight;
      const dialogWidth = dialogRef.location.nativeElement.offsetWidth;
      dialog.config.position.y = window.innerHeight * 0.5 - dialogHeight * 0.5;
      dialog.config.position.x = window.innerWidth * 0.5 - dialogWidth * 0.5;
    }
  }
}
