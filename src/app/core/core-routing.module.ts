import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { IamModule } from '../../projects/console-app/modules/iam/iam.module';
import { CognitoModule } from '../../projects/console-app/modules/cognito/cognito.module';
import { DashboardModule } from '../../projects/console-app/modules/dashboard/dashboard.module';
import { CommsModule } from '../../projects/console-app/modules/comms/comms.module';

const router: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'iam',
        // switch back to static routes until routes are fixed for `perx-dashboard-ng`
        loadChildren: () => IamModule,
        // loadChildren: '../../projects/console-app/modules/iam/iam.module#IamModule'
      },
      {
        path: 'cognito',
        loadChildren: () => CognitoModule,
        // loadChildren: '../../projects/console-app/modules/cognito/cognito.module#CognitoModule'

      },
      {
        path: 'dashboard',
        loadChildren: () => DashboardModule,
        // loadChildren: '../../projects/console-app/modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'comms',
        loadChildren: () => CommsModule,
        // loadChildren: '../../projects/console-app/modules/comms/comms.module#CommsModule'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
