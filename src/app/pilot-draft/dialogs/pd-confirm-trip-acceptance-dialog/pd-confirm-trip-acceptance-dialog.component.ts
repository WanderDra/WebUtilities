import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TripCard } from '../../models/pd-session-status-panel';

@Component({
  selector: 'app-pd-confirm-trip-acceptance-dialog',
  templateUrl: './pd-confirm-trip-acceptance-dialog.component.html',
  styleUrls: ['./pd-confirm-trip-acceptance-dialog.component.scss']
})
export class PdConfirmTripAcceptanceDialogComponent implements OnInit {

  tripTable = new MatTableDataSource<TripCard>();
  displayedColumns = [
    'tripId',
    'showtime',
    'countdown'
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {trips: TripCard[]},
    private dialogRef: MatDialogRef<PdConfirmTripAcceptanceDialogComponent>
  ) { 
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.tripTable.data = this.data.trips;
  }

}
