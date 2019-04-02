import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DismissableContentComponent} from './components/dismissable-content/dismissable-content.component';
import {FilterableTableComponent} from './components/filterable-table/filterable-table.component';
import {MaterialDesignModule} from './modules/material-design/material-design.module';
import {DialogOverviewExampleDialogComponent, ModalComponent} from './components/modal/modal.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DismissableContentComponent,
    FilterableTableComponent,
    ModalComponent,
    DialogOverviewExampleDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialDesignModule
  ],
  exports: [
    DismissableContentComponent,
    FilterableTableComponent,
    MaterialDesignModule,
    ModalComponent,
    DialogOverviewExampleDialogComponent
  ],
  entryComponents: [
    DialogOverviewExampleDialogComponent
  ]
})
export class SharedModule {
}
