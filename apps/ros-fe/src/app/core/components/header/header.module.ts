import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { MaterialDesignModule } from 'src/shared/modules/material-design/material-design.module';

const COMPONENTS = [
  HeaderComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialDesignModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class HeaderModule {
}
