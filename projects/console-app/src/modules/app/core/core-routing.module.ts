import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IamModule } from '../../iam/iam.module';
import { CognitoModule } from '../../cognito/cognito.module';
import { CoreComponent } from './core.component';

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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
