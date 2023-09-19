import { Point } from "@angular/cdk/drag-drop";
import { ComponentPortal } from "@angular/cdk/portal";
import { ComponentRef } from "@angular/core";
import { Observable } from "rxjs";

/**
 * Configurations for draggable dialog
 * 
 * newLayer: Create the dialog on a new layer.
 * 
 * data: Data passed to the dialog. 
 * Received as an injector in dialog component.
 * 
 * position: Position of the dialog.
 * 
 * setCenter: Set the dialog to the center of the window
 */
export class DraggableDialogConfig {
    /** Create the dialog on a new layer */
    newLayer?: boolean;
    /** Hide default close dialog button or not*/
    hideCloseButton?: boolean;
    /** Initial data passed to the dialog */
    data?: any;
    /** Dialog position */
    position?: Point;
    /** Drag handler height */
    dragHandlerHeight?: number;
    /** Hide handler icon */
    hideDragHandlerIcon?: boolean;
    afterCloseCallback?: (dialogId: number) => any | null;
    panelClass?: string | string[];

    constructor() {
        this.newLayer = false;
        this.hideCloseButton = false;
        this.data = null;
        this.position = {x: null, y: null};
        this.dragHandlerHeight = 20;
        this.hideDragHandlerIcon = false;
        this.panelClass = '';
        this.afterCloseCallback = null;
    }
}

/** Draggable dialog references
 * 
 * getComponentRef: get dialog component reference.
 * 
 * config: dialog configs.
 */
export class DraggableDialog {
    componentPortal: ComponentPortal<any>;
    private _componentRef: ComponentRef<any> = null;
    config: DraggableDialogConfig;

    /** Get dialog component reference. Return ref in subscription async*/
    getComponentRef(): Observable<ComponentRef<any>> {
        return new Observable<ComponentRef<any>>(subscriber => {
            try {
                setTimeout(() => {
                    subscriber.next(this._componentRef)
                    subscriber.complete();
                });
            } catch (err) {
                subscriber.error(err);
            }
        });
    }

    afterClose(afterCloseCB: (dialogId: number) => any): void {
        this.config.afterCloseCallback = afterCloseCB;
    }

    setComponentRef(componentRef: ComponentRef<any>): void {
        this._componentRef = componentRef;
    }
}