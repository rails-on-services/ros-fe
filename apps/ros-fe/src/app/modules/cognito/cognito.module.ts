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
import { NewCognitoPoolComponent } from './pages/cognito-pools/new-cognito-pool/new-cognito-pool.component';
import { NewCognitoAppComponent } from './pages/cognito-apps/new-cognito-app/new-cognito-app.component';
import { CognitoUserComponent } from './pages/cognito-users/cognito-user/cognito-user.component';
import { CognitoAppComponent } from './pages/cognito-apps/cognito-app/cognito-app.component';
import { CognitoPoolComponent } from './pages/cognito-pools/cognito-pool/cognito-pool.component';
import { AttachUsersToPoolComponent } from './pages/cognito-pools/attach-users-to-pool/attach-users-to-pool.component';
import { AttachAppsToUserComponent } from './pages/cognito-users/attach-apps-to-user/attach-apps-to-user.component';
import { AttachPoolToUserComponent } from './pages/cognito-users/attach-pools-to-user/attach-pools-to-user.component';
import { AttachUsersToAppComponent } from './pages/cognito-apps/attach-users-to-app/attach-users-to-app.component';

const COMPONENTS = [
  CognitoComponent,
  CognitoHomeComponent,
  CognitoUsersComponent,
  CognitoPoolsComponent,
  NewCognitoUserComponent,
  CognitoAppsComponent,
  NewCognitoPoolComponent,
  NewCognitoAppComponent,
  CognitoUserComponent,
  CognitoAppComponent,
  CognitoPoolComponent,
  AttachUsersToPoolComponent,
  AttachAppsToUserComponent,
  AttachPoolToUserComponent,
  AttachUsersToAppComponent
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
