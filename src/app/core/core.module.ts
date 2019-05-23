import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { IamModule } from '../modules/iam/iam.module';
import { CognitoModule } from '../modules/cognito/cognito.module';
import { CommsModule } from '../modules/comms/comms.module';
import { HeaderModule } from './components/header/header.module';
import { ServiceMenuModule } from './components/service-menu/service-menu.module';

const COMPONENTS = [
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,

    // routes,
    IamModule,
    CognitoModule,
    CommsModule,

    HeaderModule,
    ServiceMenuModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CoreModule {
}
