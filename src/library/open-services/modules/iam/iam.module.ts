import { NgModule } from '@angular/core';
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
    JsonApiModule
  ],
  exports: [
    ...COMPONENTS,
    JsonApiModule
  ],
  providers: [],
  bootstrap: []
})
export class IamModule { }
