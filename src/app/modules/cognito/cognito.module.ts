import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CognitoComponent } from './cognito.component';
import { CognitoRoutingModule } from './cognito-routing.module';
import { CognitoHomeComponent } from './pages/cognito-home/cognito-home.component';
import { CognitoUsersComponent } from './pages/cognito-users/cognito-users.component';
import { CognitoPoolsComponent } from './pages/cognito-pools/cognito-pools.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewCognitoUserComponent } from './pages/cognito-users/new-cognito-user/new-cognito-user.component';
import { SharedModule } from '../../../shared/shared.module';
import { OpenUiComponentsModule, ConfirmationModal, ManageColumnModal } from '@perx/open-ui-components';
import { CognitoAppsComponent } from './pages/cognito-apps/cognito-apps.component';
import { ServiceMenuModule } from 'src/app/core/components/service-menu/service-menu.module';

const COMPONENTS = [
  CognitoComponent,
  CognitoHomeComponent,
  CognitoUsersComponent,
  CognitoPoolsComponent,
  NewCognitoUserComponent,
  CognitoAppsComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    CognitoRoutingModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OpenUiComponentsModule,
    ServiceMenuModule
  ],
  exports: [
    ...COMPONENTS,
    CognitoRoutingModule
  ],
  entryComponents: [
    ManageColumnModal,
    ConfirmationModal,
    NewCognitoUserComponent]
})
export class CognitoModule {
}
