import { Point } from "@angular/cdk/drag-drop";

/**
 * Configurations for draggable dialog
 * 
 * newLayer: Create the dialog on a new layer
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

    constructor() {
        this.newLayer = false;
        this.hideCloseButton = false;
        this.data = null;
        this.position = {x: window.innerWidth / 2 * 0.5, y: window.innerHeight / 2 * 0.5};
    }
}