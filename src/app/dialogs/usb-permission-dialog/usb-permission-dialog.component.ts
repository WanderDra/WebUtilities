import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogOptions, DialogSelections } from 'src/app/models/diglog';

@Component({
  selector: 'app-usb-permission-dialog',
  templateUrl: './usb-permission-dialog.component.html',
  styleUrls: ['./usb-permission-dialog.component.scss']
})
export class UsbPermissionDialogComponent implements OnInit {

  dialogOptions = DialogSelections;

  constructor(
    public dialogRef: MatDialogRef<UsbPermissionDialogComponent>
  ) { }

  ngOnInit(): void {
  }

}
