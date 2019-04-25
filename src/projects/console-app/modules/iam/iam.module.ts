import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpenUiComponentsModule , ConfirmationModal} from '@perx/open-ui-components';
import {UsersComponent} from './pages/users/users.component';
import {GroupsComponent} from './pages/groups/groups.component';
import {HomeComponent} from './pages/home/home.component';
import {IamRoutingModule} from './iam-routing.module';
import {IamMenuComponent} from './components/iam-menu/iam-menu.component';
import {IamComponent} from './iam.component';
import {NewUserComponent} from './pages/users/new-user/new-user.component';
import { NewGroupComponent } from './pages/groups/new-group/new-group.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { PolicyAttachComponent } from './pages/policies/policy-attach/policy-attach.component';
import { NewPolicyComponent } from './pages/policies/new-policy/new-policy.component';
import {SharedModule} from '../../../../shared/shared.module';

// import {routes} from './iam-routing.module';

@NgModule({
  declarations: [UsersComponent,
    GroupsComponent,
    HomeComponent,
    IamMenuComponent,
    IamComponent,
    NewUserComponent,
    NewGroupComponent,
    PoliciesComponent,
    PolicyAttachComponent,
    NewPolicyComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IamRoutingModule,
    // routes,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OpenUiComponentsModule
  ],
  exports: [HomeComponent, IamComponent],
  entryComponents: [
    ConfirmationModal,
    NewUserComponent]
})
export class IamModule {
}
