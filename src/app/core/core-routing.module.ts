import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';

const router: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'iam',
        loadChildren: '../../projects/console-app/modules/iam/iam.module#IamModule'
      },
      {
        path: 'cognito',
        loadChildren: '../../projects/console-app/modules/cognito/cognito.module#CognitoModule'

      },
      {
        path: 'dashboard',
        loadChildren: '../../projects/console-app/modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'campaigns',
        loadChildren: '../../projects/console-app/modules/campaigns/campaigns.module#CampaignsModule'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
