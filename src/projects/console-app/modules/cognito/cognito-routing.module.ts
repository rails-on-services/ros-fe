import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CognitoHomeComponent } from './pages/cognito-home/cognito-home.component';
import { CognitoUsersComponent } from './pages/cognito-users/cognito-users.component';
import { CognitoAppsComponent } from './pages/cognito-apps/cognito-apps.component';
import { CognitoPoolsComponent } from './pages/cognito-pools/cognito-pools.component';
// import {ModalComponent} from '../../shared/components/modal/modal.component';
import { CognitoComponent } from './cognito.component';
import { NewCognitoUserComponent } from './pages/cognito-users/new-cognito-user/new-cognito-user.component';
// import {NewCognitoUserResolverService} from './pages/users/new-user/new-user-resolver.service';

const router: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: CognitoComponent,
    children: [
      {
        path: 'home',
        component: CognitoHomeComponent,
      },
      {
        path: 'users',
        component: CognitoUsersComponent,
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
        component: NewCognitoUserComponent
      },
      {
        path: 'pools',
        component: CognitoPoolsComponent,
      },
      {
        path: 'apps',
        component: CognitoAppsComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class CognitoRoutingModule {
}
