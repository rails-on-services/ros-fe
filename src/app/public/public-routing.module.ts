import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public.component';
// import { IamModule } from '../../projects/console-app/modules/iam/iam.module';
// import { CognitoModule } from '../../projects/console-app/modules/cognito/cognito.module';
// import { DashboardModule } from '../../projects/console-app/modules/dashboard/dashboard.module';
// import { CommsModule } from '../../projects/console-app/modules/comms/comms.module';

const router: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
