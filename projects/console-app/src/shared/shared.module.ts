import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DismissableContentComponent} from './components/dismissable-content/dismissable-content.component';
import {FilterableTableComponent} from './components/filterable-table/filterable-table.component';
import {MaterialDesignModule} from './modules/material-design/material-design.module';
import {DialogOverviewExampleDialogComponent, ModalComponent} from './components/modal/modal.component';
import {FormsModule} from '@angular/forms';
import {AuthenticationModule} from './modules/authentication';

@NgModule({
  declarations: [
    DismissableContentComponent,
    FilterableTableComponent,
    ModalComponent,
    DialogOverviewExampleDialogComponent
  ],
  imports: [
    AuthenticationModule,
    CommonModule,
    FormsModule,
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
    DialogOverviewExampleDialogComponent
  ]
})
export class SharedModule {
}
