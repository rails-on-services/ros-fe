import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {UsersComponent} from './pages/users/users.component';
import {GroupsComponent} from './pages/groups/groups.component';
import {PoliciesComponent} from './pages/policies/policies.component';
import {PolicyAttachComponent} from './pages/policy-attach/policy-attach.component';
import {ModalComponent} from '../../../../../shared/components/modal/modal.component';
import {IamComponent} from './iam.component';
import {NewUserComponent} from './pages/users/new-user/new-user.component';
import {NewUserResolverService} from './pages/users/new-user/new-user-resolver.service';
import { NewGroupComponent } from './pages/groups/new-group/new-group.component';

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
        path: 'groups/new-group',
        component: NewGroupComponent
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
