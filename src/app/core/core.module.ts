import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreComponent } from './core.component';
import { IamModule } from '../modules/iam/iam.module';
import { CognitoModule } from '../modules/cognito/cognito.module';
import { CommsModule } from '../modules/comms/comms.module';

const COMPONENTS = [
  HeaderComponent,
  CoreComponent,
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
    CommsModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CoreModule {
}
