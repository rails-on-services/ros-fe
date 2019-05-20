import { NgModule } from '@angular/core';

import { OpenUiComponentsModule } from '@perx/open-ui-components';

import { JsonApiModule } from 'angular2-jsonapi';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    OpenUiComponentsModule,
    JsonApiModule
  ],
  exports: [
    ...COMPONENTS,
    JsonApiModule
  ],
  providers: [],
  bootstrap: []
})
export class CommsModule { }
