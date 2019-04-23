import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  type: string;
}

@Component({
  selector: 'app-rename-modal',
  templateUrl: './rename-modal.component.html',
  styleUrls: ['./rename-modal.component.scss']
})

// tslint:disable-next-line: component-class-suffix
export class RenameModal implements OnInit {

  type: string;

  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<RenameModal>,
              @Inject(MAT_DIALOG_DATA) public injectedData: DialogData) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  hasError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  onConfirm() {
    return this.formGroup.controls.name.value;
  }
}
