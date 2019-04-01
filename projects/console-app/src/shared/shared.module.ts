import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DismissableContentComponent } from './components/dismissable-content/dismissable-content.component';
import { FilterableTableComponent } from './components/filterable-table/filterable-table.component';

@NgModule({
  declarations: [DismissableContentComponent, FilterableTableComponent],
  imports: [
    CommonModule
  ],
  exports: [DismissableContentComponent, FilterableTableComponent]
})
export class SharedModule { }
