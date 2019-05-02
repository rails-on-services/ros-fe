import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpenUiComponentsModule , ConfirmationModal, ManageColumnModal, RenameModal} from '@perx/open-ui-components';
import {IamUsersComponent} from './pages/iam-users/iam-users.component';
import {IamGroupsComponent} from './pages/iam-groups/iam-groups.component';
import {IamHomeComponent} from './pages/iam-home/iam-home.component';
import {IamRoutingModule} from './iam-routing.module';
import {IamMenuComponent} from './components/iam-menu/iam-menu.component';
import {IamComponent} from './iam.component';
import {NewIamUserComponent} from './pages/iam-users/new-iam-user/new-iam-user.component';
import { NewGroupComponent } from './pages/iam-groups/new-group/new-group.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { PolicyAttachComponent } from './pages/policies/policy-attach/policy-attach.component';
import { NewPolicyComponent } from './pages/policies/new-policy/new-policy.component';
import {SharedModule} from '../../../../shared/shared.module';
import { AddGroupUsersComponent } from './pages/iam-groups/add-group-users/add-group-users.component';

// import {routes} from './iam-routing.module';

@NgModule({
  declarations: [IamUsersComponent,
    IamGroupsComponent,
    IamHomeComponent,
    IamMenuComponent,
    IamComponent,
    NewIamUserComponent,
    NewGroupComponent,
    PoliciesComponent,
    PolicyAttachComponent,
    NewPolicyComponent,
    AddGroupUsersComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IamRoutingModule,
    // routes,
    ReactiveFormsModule,
    FormsModule,
    OpenUiComponentsModule,
    SharedModule
  ],
  exports: [IamHomeComponent, IamComponent],
  entryComponents: [
    ManageColumnModal,
    ConfirmationModal,
    RenameModal,
    NewIamUserComponent]
})
export class IamModule {
}
