import { NgModule } from '@angular/core';

import { DismissableContentComponent } from './dismissable-content/dismissable-content.component';
import { FilterableTableComponent } from './filterable-table/filterable-table.component';
import { ManageColumnModal } from './modal/manage-column-modal/manage-column-modal.component';
import { ConfirmationModal } from './modal/confirmation-modal/confirmation-modal.component';
import { RenameModal } from './modal/rename-modal/rename-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  DismissableContentComponent,
  FilterableTableComponent,
  ManageColumnModal,
  ConfirmationModal,
  RenameModal
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    RouterModule
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [],
  bootstrap: []
})
export class OpenUiComponentsModule { }