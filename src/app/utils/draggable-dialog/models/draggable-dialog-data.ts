import { Injectable } from "@angular/core";
import { DialogOverlayComponent } from "../components/dialog-overlay/dialog-overlay.component";

/** Data passed to the dialog */
@Injectable()
export class DraggableDialogData {
    /** Dialog id in the current layer */
    id: number;
    /** Data passed to the dialog */
    data: any;
    /** Overlay that the dialog attached to */
    overlay: DialogOverlayComponent;
}