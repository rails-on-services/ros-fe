import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IamModule} from '../iam/iam.module';
import {CoreModule} from './core/core.module';

const router: Routes = [
  {
    path: 'iam',
    loadChildren: () => IamModule
  },
  {
    path: 'core',
    loadChildren: () => CoreModule
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
