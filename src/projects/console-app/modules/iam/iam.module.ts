import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './pages/users/users.component';
import {GroupsComponent} from './pages/groups/groups.component';
import {HomeComponent} from './pages/home/home.component';
import {IamRoutingModule} from './iam-routing.module';
import {IamMenuComponent} from './components/iam-menu/iam-menu.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IamComponent} from './iam.component';
import {DismissableContentComponent} from '../../../../../shared/components/dismissable-content/dismissable-content.component';
import {NewUserComponent} from './pages/users/new-user/new-user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewGroupComponent } from './pages/groups/new-group/new-group.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { PolicyAttachComponent } from './pages/policies/policy-attach/policy-attach.component';
import { NewPolicyComponent } from './pages/policies/new-policy/new-policy.component';

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
    FormsModule
  ],
  exports: [HomeComponent, IamComponent],
  entryComponents: [
    DismissableContentComponent,
    NewUserComponent]
})
export class IamModule {
}
