import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IamHomeComponent} from './pages/iam-home/iam-home.component';
import {IamUsersComponent} from './pages/iam-users/iam-users.component';
import {IamGroupsComponent} from './pages/iam-groups/iam-groups.component';
import {PoliciesComponent} from './pages/policies/policies.component';
import {PolicyAttachComponent} from './pages/policies/policy-attach/policy-attach.component';
import {NewPolicyComponent} from './pages/policies/new-policy/new-policy.component';
import {IamComponent} from './iam.component';
import {NewIamUserComponent} from './pages/iam-users/new-iam-user/new-iam-user.component';
import { NewGroupComponent } from './pages/iam-groups/new-group/new-group.component';
import { AddGroupUsersComponent } from './pages/iam-groups/add-group-users/add-group-users.component';

const router: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: IamComponent,
    children: [
      {
        path: 'home',
        component: IamHomeComponent,
      },
      {
        path: 'users',
        component: IamUsersComponent,
        children: [
          // {
          //   path: 'new-user',
          //   component: ModalComponent,
          //   resolve: {
          //     modal: NewCognitoUserResolverService
          //   }
          // },
        ],
      },
      {
        path: 'users/new-user',
        component: NewIamUserComponent
      },
      {
        path: 'groups',
        component: IamGroupsComponent,
      },
      {
        path: 'policies',
        component: PoliciesComponent,
      },
      {
        path: 'policies/policy-attach/:id',
        component: PolicyAttachComponent,
      },
      {
        path: 'policies/new-policy',
        component: NewPolicyComponent,
      },
      {
        path: 'groups/new-group',
        component: NewGroupComponent
      },
      {
        path: 'groups/user-management',
        component: AddGroupUsersComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class IamRoutingModule {
}
