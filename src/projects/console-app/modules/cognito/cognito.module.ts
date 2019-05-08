import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CognitoComponent } from './cognito.component';
import { CognitoRoutingModule } from './cognito-routing.module';
import { CognitoHomeComponent } from './pages/cognito-home/cognito-home.component';
import { CognitoUsersComponent } from './pages/cognito-users/cognito-users.component';
import { CognitoPoolsComponent } from './pages/cognito-pools/cognito-pools.component';
import { CognitoMenuComponent } from './components/cognito-menu/cognito-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewCognitoUserComponent } from './pages/cognito-users/new-cognito-user/new-cognito-user.component';
import { SharedModule } from '../../../../shared/shared.module';
import { OpenUiComponentsModule, ConfirmationModal, ManageColumnModal } from '@perx/open-ui-components';
import { CognitoAppsComponent } from './pages/cognito-apps/cognito-apps.component';

@NgModule({
  declarations: [
    CognitoComponent,
    CognitoHomeComponent,
    CognitoUsersComponent,
    CognitoPoolsComponent,
    CognitoMenuComponent,
    NewCognitoUserComponent,
    CognitoAppsComponent
  ],
  imports: [
    CommonModule,
    CognitoRoutingModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OpenUiComponentsModule
  ],
  entryComponents: [
    ManageColumnModal,
    ConfirmationModal,
    NewCognitoUserComponent]
})
export class CognitoModule {
}
