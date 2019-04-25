import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { IamModule } from '../../projects/console-app/modules/iam/iam.module';
// import { CognitoModule } from '../../projects/console-app/modules/cognito/cognito.module';
import { CoreComponent } from './core.component';
// import { DashboardModule } from '../../projects/console-app/modules/dashboard/dashboard.module';

const router: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'iam',
        // loadChildren: () => IamModule
        loadChildren: '../../projects/console-app/modules/iam/iam.module#IamModule'
      },
      {
        path: 'cognito',
        // loadChildren: () => CognitoModule
        loadChildren: '../../projects/console-app/modules/cognito/cognito.module#CognitoModule'

      },
      {
        path: 'dashboard',
        // loadChildren: () => DashboardModule
        loadChildren: '../../projects/console-app/modules/dashboard/dashboard.module#DashboardModule'
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
