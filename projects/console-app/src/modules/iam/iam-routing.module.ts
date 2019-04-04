import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {UsersComponent} from './pages/users/users.component';
import {GroupsComponent} from './pages/groups/groups.component';
import {ModalComponent} from '../../shared/components/modal/modal.component';
import {IamComponent} from './iam.component';
import {NewUserComponent} from './pages/users/new-user/new-user.component';
import {NewUserResolverService} from './pages/users/new-user/new-user-resolver.service';

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
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class IamRoutingModule {
}
