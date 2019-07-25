import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionComponent, SelectionWrapperComponent, SelectionGroupDirective } from './selection.component';
import { SelectionValidatorDirective } from './selection.directive';

import { MaterialDesignModule } from '../../shared/material-design/material-design.module';

@NgModule({
  declarations: [
    SelectionComponent,
    SelectionWrapperComponent,
    SelectionGroupDirective,
    SelectionValidatorDirective
  ],
  imports: [
    CommonModule,
    MaterialDesignModule

  ],
  exports: [
    SelectionComponent,
    SelectionGroupDirective,
    SelectionValidatorDirective
  ]
})
export class SelectionModule { }
