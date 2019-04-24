import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { IamModule } from '../../projects/console-app/modules/iam/iam.module';
import { CognitoModule } from '../../projects/console-app/modules/cognito/cognito.module';

@NgModule({
  declarations: [
    HeaderComponent,
    CoreComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,

    // routes,
    IamModule,
    CognitoModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule {
}
