import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CognitoHomeComponent } from './pages/cognito-home/cognito-home.component';
import { CognitoUsersComponent } from './pages/cognito-users/cognito-users.component';
import { CognitoAppsComponent } from './pages/cognito-apps/cognito-apps.component';
import { CognitoPoolsComponent } from './pages/cognito-pools/cognito-pools.component';
import { CognitoComponent } from './cognito.component';
import { NewCognitoUserComponent } from './pages/cognito-users/new-cognito-user/new-cognito-user.component';
import { NewCognitoPoolComponent } from './pages/cognito-pools/new-cognito-pool/new-cognito-pool.component';
import { NewCognitoAppComponent } from './pages/cognito-apps/new-cognito-app/new-cognito-app.component';

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
        path: 'pools',
        component: CognitoPoolsComponent,
      },
      {
        path: 'pools/new-pool',
        component: NewCognitoPoolComponent
      },
      {
        path: 'apps',
        component: CognitoAppsComponent,
      },
      {
        path: 'apps/new-app',
        component: NewCognitoAppComponent
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
