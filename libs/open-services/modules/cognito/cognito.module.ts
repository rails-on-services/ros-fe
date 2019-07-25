import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OpenUiComponentsModule } from '@perx/open-ui-components';
import { JsonApiModule } from 'angular2-jsonapi';


@NgModule({
  imports: [
    CommonModule,
    OpenUiComponentsModule,
    JsonApiModule
  ],
  exports: [
    JsonApiModule
  ],
  providers: [],
  bootstrap: []
})

export class CognitoModule {
}
