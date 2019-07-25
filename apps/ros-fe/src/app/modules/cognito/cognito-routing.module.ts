import { AttachUsersToAppComponent } from './pages/cognito-apps/attach-users-to-app/attach-users-to-app.component';
import { AttachUsersToPoolComponent } from './pages/cognito-pools/attach-users-to-pool/attach-users-to-pool.component';
import { AttachAppsToUserComponent } from './pages/cognito-users/attach-apps-to-user/attach-apps-to-user.component';
import { AttachGroupsToUserComponent } from './../iam/pages/iam-users/attach-groups-to-user/attach-groups-to-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CognitoHomeComponent } from './pages/cognito-home/cognito-home.component';
import { CognitoUsersComponent } from './pages/cognito-users/cognito-users.component';
import { CognitoUserComponent } from './pages/cognito-users/cognito-user/cognito-user.component';
import { NewCognitoUserComponent } from './pages/cognito-users/new-cognito-user/new-cognito-user.component';
import { CognitoAppsComponent } from './pages/cognito-apps/cognito-apps.component';
import { CognitoPoolsComponent } from './pages/cognito-pools/cognito-pools.component';
import { CognitoComponent } from './cognito.component';
import { NewCognitoPoolComponent } from './pages/cognito-pools/new-cognito-pool/new-cognito-pool.component';
import { NewCognitoAppComponent } from './pages/cognito-apps/new-cognito-app/new-cognito-app.component';
import { CognitoPoolComponent } from './pages/cognito-pools/cognito-pool/cognito-pool.component';
import { CognitoAppComponent } from './pages/cognito-apps/cognito-app/cognito-app.component';

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
      },
      {
        path: 'users/new-user',
        component: NewCognitoUserComponent
      },
      {
        path: 'users/:id/attach-pools',
        component: AttachGroupsToUserComponent
      },
      {
        path: 'users/:id/attach-apps',
        component: AttachAppsToUserComponent
      },
      {
        path: 'users/:id',
        component: CognitoUserComponent
      },
      {
        path: 'pools',
        component: CognitoPoolsComponent,
      },
      {
        path: 'pools/new-pool',
        component: NewCognitoPoolComponent
      },
      {
        path: 'pools/:id/attach-users',
        component: AttachUsersToPoolComponent
      },
      {
        path: 'pools/:id',
        component: CognitoPoolComponent
      },
      {
        path: 'apps',
        component: CognitoAppsComponent,
      },
      {
        path: 'apps/new-app',
        component: NewCognitoAppComponent
      },
      {
        path: 'apps/:id/attach-users',
        component: AttachUsersToAppComponent
      },
      {
        path: 'apps/:id',
        component: CognitoAppComponent
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
