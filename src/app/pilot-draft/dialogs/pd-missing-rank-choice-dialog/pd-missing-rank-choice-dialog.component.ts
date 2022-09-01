import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pd-missing-rank-choice-dialog',
  templateUrl: './pd-missing-rank-choice-dialog.component.html',
  styleUrls: ['./pd-missing-rank-choice-dialog.component.scss']
})
export class PdMissingRankChoiceDialogComponent implements OnInit {

  invalidAmount: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {invalidAmount: number},
    private dialogRef: MatDialogRef<PdMissingRankChoiceDialogComponent>
  ) { 
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.invalidAmount = this.data.invalidAmount;
  }

}
