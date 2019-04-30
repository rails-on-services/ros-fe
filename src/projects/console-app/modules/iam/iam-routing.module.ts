import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {UsersComponent} from './pages/users/users.component';
import {GroupsComponent} from './pages/groups/groups.component';
import {PoliciesComponent} from './pages/policies/policies.component';
import {PolicyAttachComponent} from './pages/policies/policy-attach/policy-attach.component';
import {NewPolicyComponent} from './pages/policies/new-policy/new-policy.component';
import {IamComponent} from './iam.component';
import {NewUserComponent} from './pages/users/new-user/new-user.component';
import { NewGroupComponent } from './pages/groups/new-group/new-group.component';
import { UserManagementComponent } from './pages/groups/user-management/user-management.component';

export const router: Routes = [
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
        component: HomeComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          // {
          //   path: 'new-user',
          //   component: ModalComponent,
          //   resolve: {
          //     modal: NewUserResolverService
          //   }
          // },
        ],
      },
      {
        path: 'users/new-user',
        component: NewUserComponent
      },
      {
        path: 'groups',
        component: GroupsComponent,
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
        component: UserManagementComponent
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
