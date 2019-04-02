import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DismissableContentComponent} from './components/dismissable-content/dismissable-content.component';
import {FilterableTableComponent} from './components/filterable-table/filterable-table.component';
import {MaterialDesignModule} from './modules/material-design/material-design.module';

@NgModule({
  declarations: [DismissableContentComponent, FilterableTableComponent],
  imports: [
    CommonModule,
    MaterialDesignModule
  ],
  exports: [DismissableContentComponent, FilterableTableComponent, MaterialDesignModule]
})
export class SharedModule {
}
