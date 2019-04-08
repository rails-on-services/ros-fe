import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IamModule } from '../../iam/iam.module';
import { CognitoModule } from '../../cognito/cognito.module';
import { CoreComponent } from './core.component';
import { DashboardModule } from '../../dashboard/dashboard.module';

const router: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'iam',
        loadChildren: () => IamModule
      },
      {
        path: 'cognito',
        loadChildren: () => CognitoModule
      },
      {
        path: 'dashboard',
        loadChildren: () => DashboardModule
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
