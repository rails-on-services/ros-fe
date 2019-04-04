import { NgModule } from '@angular/core';

import { JsonApiModule } from 'angular2-jsonapi';
import { IamUser } from './models/user.model';

@NgModule({
  declarations: [
  ],
  imports: [
    JsonApiModule
  ],
  exports: [
    JsonApiModule
  ]
})
export class IamModule { }
