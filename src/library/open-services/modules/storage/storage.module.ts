import { NgModule } from '@angular/core';

import { OpenUiComponentsModule } from '@perx/open-ui-components';
import { HttpClientModule } from '@angular/common/http'
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
    HttpClientModule,
    JsonApiModule
  ],
  exports: [
    ...COMPONENTS,
    JsonApiModule
  ],
  providers: [],
  bootstrap: []
})
export class StorageModule { }
