import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CoreModule } from './core/core.module';
// import { PublicModule } from './public/public.module';

const router: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './public/public.module#PublicModule'
  },
  {
    path: '',
    pathMatch: 'full',
    // loadChildren: () => CoreModule
    loadChildren: './core/core.module#CoreModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
