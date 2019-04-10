import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DismissableContentComponent} from './components/dismissable-content/dismissable-content.component';
import {FilterableTableComponent} from './components/filterable-table/filterable-table.component';
import {MaterialDesignModule} from './modules/material-design/material-design.module';
import {DialogOverviewExampleDialogComponent, ModalComponent} from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthenticationModule} from './modules/authentication';
import { ManageColumnModal } from './components/modal/manage-column-modal/manage-column-modal.component';

@NgModule({
  declarations: [
    DismissableContentComponent,
    FilterableTableComponent,
    ModalComponent,
    DialogOverviewExampleDialogComponent,
    ManageColumnModal
  ],
  imports: [
    AuthenticationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule
  ],
  exports: [
    DialogOverviewExampleDialogComponent,
    DismissableContentComponent,
    FilterableTableComponent,
    ModalComponent,
    AuthenticationModule,
    MaterialDesignModule
  ],
  entryComponents: [
    DialogOverviewExampleDialogComponent,
    ManageColumnModal
  ]
})
export class SharedModule {
}
