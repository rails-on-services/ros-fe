import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpenUiComponentsModule, ConfirmationModal, ManageColumnModal, RenameModal } from '@perx/open-ui-components';
import { IamUsersComponent } from './pages/iam-users/iam-users.component';
import { IamGroupsComponent } from './pages/iam-groups/iam-groups.component';
import { IamHomeComponent } from './pages/iam-home/iam-home.component';
import { IamRoutingModule } from './iam-routing.module';
import { IamComponent } from './iam.component';
import { NewIamUserComponent } from './pages/iam-users/new-iam-user/new-iam-user.component';
import { NewIamGroupComponent } from './pages/iam-groups/new-iam-group/new-iam-group.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { NewIamPolicyComponent } from './pages/policies/new-iam-policy/new-iam-policy.component';
import { AttachUsersToGroupComponent } from './pages/iam-groups/attach-users-to-group/attach-users-to-group.component';
import { IamGroupComponent } from './pages/iam-groups/iam-group/iam-group.component';
import { IamUserComponent } from './pages/iam-users/iam-user/iam-user.component';
import { SharedModule } from '../../../shared/shared.module';
import { ServiceMenuModule } from 'src/app/core/components/service-menu/service-menu.module';
import { AttachGroupsToUserComponent } from './pages/iam-users/attach-groups-to-user/attach-groups-to-user.component';
import { AttachPoliciesToUserComponent } from './pages/iam-users/attach-policies-to-user/attach-policies-to-user.component';
import { IamPolicyComponent } from './pages/policies/iam-policy/iam-policy.component';
import { AttachUsersToPolicyComponent } from './pages/policies/attach-users-to-policy/attach-users-to-policy.component';

const COMPONENTS = [
  IamUsersComponent,
  IamGroupsComponent,
  IamHomeComponent,
  IamComponent,
  NewIamUserComponent,
  NewIamGroupComponent,
  PoliciesComponent,
  AttachGroupsToUserComponent,
  AttachPoliciesToUserComponent,
  IamPolicyComponent,
  NewIamPolicyComponent,
  AttachUsersToGroupComponent,
  IamGroupComponent,
  IamUserComponent,
  AttachUsersToPolicyComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IamRoutingModule,
    // routes,
    ReactiveFormsModule,
    FormsModule,
    OpenUiComponentsModule,
    SharedModule,
    ServiceMenuModule
  ],
  exports: [
    ...COMPONENTS,
    IamRoutingModule
  ],
  entryComponents: [
    ManageColumnModal,
    ConfirmationModal,
    RenameModal,
    NewIamUserComponent
  ]
})
export class IamModule {
}
