import { Component, OnInit } from '@angular/core';
import { DraggableDialogData } from '../../models/draggable-dialog-data';
import { DraggableDialogConfig } from '../../models/draggable-dialog-config';
import { DraggableDialogService } from '../../services/draggable-dialog.service';

@Component({
  selector: 'app-dialog-frame',
  templateUrl: './dialog-frame.component.html',
  styleUrls: ['./dialog-frame.component.scss']
})
export class DialogFrameComponent implements OnInit {

  data: any;

  constructor(
    private inputData: DraggableDialogData,
    private draggableDialog: DraggableDialogService
    ) { 
  }

  ngOnInit(): void {
    this.data = this.inputData.data;
  }
  
  onCreateDialogClick(): void {
    const dialogConfig = new DraggableDialogConfig();
    dialogConfig.data = 'TEST DATA';
    const dialog = this.draggableDialog.createDialog(DialogFrameComponent, dialogConfig);
  }

  onCreateDialogOnNewLayerClick(): void {
    const dialogConfig = new DraggableDialogConfig();
    dialogConfig.newLayer = true;
    dialogConfig.data = 'TEST DATA';
    const dialog = this.draggableDialog.createDialog(DialogFrameComponent, dialogConfig);
  }

}
