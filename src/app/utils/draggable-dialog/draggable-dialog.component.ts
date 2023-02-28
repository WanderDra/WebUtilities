import { Component, ComponentRef, OnInit } from '@angular/core';
import { DraggableDialogService } from './services/draggable-dialog.service';
import { DialogFrameComponent } from './components/dialog-frame/dialog-frame.component';
import { DraggableDialog, DraggableDialogConfig } from './models/draggable-dialog-config';

@Component({
  selector: 'app-draggable-dialog',
  templateUrl: './draggable-dialog.component.html',
  styleUrls: ['./draggable-dialog.component.scss']
})
export class DraggableDialogComponent implements OnInit {

  constructor(
    private draggableDialog: DraggableDialogService
  ) { }

  ngOnInit(): void {

  }

  onCreateDialogClick(): void {
    const dialogConfig = new DraggableDialogConfig();
    dialogConfig.data = 'TEST DATA';
    const dialog: DraggableDialog = this.draggableDialog.createDialog(DialogFrameComponent, dialogConfig);
    dialog.getComponentRef().subscribe((ref: ComponentRef<DialogFrameComponent>) => {
      console.log(ref.instance.data);
    })
    
  }

}
