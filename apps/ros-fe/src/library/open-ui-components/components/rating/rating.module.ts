import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingComponent } from './rating.component';

import { FormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design/material-design.module';

@NgModule({
  declarations: [
    RatingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialDesignModule
  ],
  exports: [
    FormsModule,
    RatingComponent
  ]
})
export class RatingModule { }
