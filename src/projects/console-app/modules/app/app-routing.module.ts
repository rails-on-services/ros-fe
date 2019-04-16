import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';

const router: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // loadChildren: () => CoreModule
    loadChildren: './core/core.module#CoreModule'
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
