import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TripCard } from '../../models/pd-session-status-panel';

@Component({
  selector: 'app-pd-confirm-submission-dialog',
  templateUrl: './pd-confirm-submission-dialog.component.html',
  styleUrls: ['./pd-confirm-submission-dialog.component.scss']
})
export class PdConfirmSubmissionDialogComponent implements OnInit, AfterViewInit {

  tripTable = new MatTableDataSource<TripCard>();
  displayedColumns = [
    'rank',
    'tripId',
    'showtime',
    'countdown'
  ];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {trips: TripCard[]},
    private dialogRef: MatDialogRef<PdConfirmSubmissionDialogComponent>
  ) { 
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.tripTable.data = this.sortByRank(this.data.trips);
  }

  ngAfterViewInit(): void {
    this.tripTable.sort = this.sort;
  }

  sortByRank(trips: TripCard[]): TripCard[] {
    return trips.sort((a, b) => {
      if (a.rankSelected === 0 && b.rankSelected === 0) {
        return 0;
      } else if (a.rankSelected === 0) {
        return 1;
      } else if (b.rankSelected === 0) {
        return -1;
      } else {
        return a.rankSelected - b.rankSelected;
      }
    });
  }

}
