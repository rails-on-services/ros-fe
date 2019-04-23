import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData {
  type: string;
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})

// tslint:disable-next-line: component-class-suffix
export class ConfirmationModal implements OnInit {

  type: string;
  constructor(public dialogRef: MatDialogRef<ConfirmationModal>,
              @Inject(MAT_DIALOG_DATA) public injectedData: DialogData) {
  }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }
}
