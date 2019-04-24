import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData {
  header: string;
  content: string;
  btnColor: string;
  action: string;
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})

// tslint:disable-next-line: component-class-suffix
export class ConfirmationModal implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationModal>,
              @Inject(MAT_DIALOG_DATA) public injectedData: DialogData) {
  }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }
}
