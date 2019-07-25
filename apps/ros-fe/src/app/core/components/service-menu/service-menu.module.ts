import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceMenuComponent } from './service-menu.component';
import { MaterialDesignModule } from 'src/shared/modules/material-design/material-design.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  ServiceMenuComponent
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
export class ServiceMenuModule {
}
