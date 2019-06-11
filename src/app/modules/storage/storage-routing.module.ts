import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorageComponent } from './storage.component';
import { NewStorageComponent } from './new-storage/new-storage.component';

const router: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: StorageComponent,
  },
  {
    path: 'new-storage',
    component: NewStorageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class StorageRoutingModule {
}
