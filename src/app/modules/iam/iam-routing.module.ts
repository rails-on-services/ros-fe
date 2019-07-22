import { AttachUsersToPolicyComponent } from './pages/policies/attach-users-to-policy/attach-users-to-policy.component';
import { AttachPoliciesToUserComponent } from './pages/iam-users/attach-policies-to-user/attach-policies-to-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IamHomeComponent } from './pages/iam-home/iam-home.component';
import { IamUsersComponent } from './pages/iam-users/iam-users.component';
import { IamGroupsComponent } from './pages/iam-groups/iam-groups.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { NewIamPolicyComponent } from './pages/policies/new-iam-policy/new-iam-policy.component';
import { IamComponent } from './iam.component';
import { NewIamUserComponent } from './pages/iam-users/new-iam-user/new-iam-user.component';
import { NewIamGroupComponent } from './pages/iam-groups/new-iam-group/new-iam-group.component';
import { AttachUsersToGroupComponent } from './pages/iam-groups/attach-users-to-group/attach-users-to-group.component';
import { IamUserComponent } from './pages/iam-users/iam-user/iam-user.component';
import { IamGroupComponent } from './pages/iam-groups/iam-group/iam-group.component';
import { AttachGroupsToUserComponent } from './pages/iam-users/attach-groups-to-user/attach-groups-to-user.component';

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
        component: IamUsersComponent
      },
      {
        path: 'users/new-user',
        component: NewIamUserComponent
      },
      {
        path: 'users/:id/attach-groups',
        component: AttachGroupsToUserComponent
      },
      {
        path: 'users/:id/attach-policies',
        component: AttachPoliciesToUserComponent
      },
      {
        path: 'users/:id',
        component: IamUserComponent
      },
      {
        path: 'groups',
        component: IamGroupsComponent,
      },
      {
        path: 'groups/new-group',
        component: NewIamGroupComponent
      },
      {
        path: 'groups/:id/attach-users',
        component: AttachUsersToGroupComponent
      },
      {
        path: 'groups/:id',
        component: IamGroupComponent
      },
      {
        path: 'policies',
        component: PoliciesComponent,
      },
      {
        path: 'policies/new-policy',
        component: NewIamPolicyComponent,
      },
      {
        path: 'policies/:id/attach-users',
        component: AttachUsersToPolicyComponent,
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
