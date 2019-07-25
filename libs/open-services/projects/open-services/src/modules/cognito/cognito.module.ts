import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JsonApiModule } from 'angular2-jsonapi';

@NgModule({
  imports: [
    CommonModule,
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
