import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const router: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './public/public.module#PublicModule'
  },
  {
    path: 'iam',
    loadChildren: './modules/iam/iam.module#IamModule'
  },
  {
    path: 'cognito',
    loadChildren: './modules/cognito/cognito.module#CognitoModule'

  },
  {
    path: 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'comms',
    loadChildren: './modules/comms/comms.module#CommsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
