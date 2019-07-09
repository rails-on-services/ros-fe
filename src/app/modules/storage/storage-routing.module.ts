import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesComponent } from './pages/files/files.component';
import { NewStorageComponent } from './pages/new-storage/new-storage.component';
import { StorageComponent } from './storage.component';

const router: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: StorageComponent,
    children: [
      {
        path: 'home',
        component: FilesComponent,
      },
      {
        path: 'new-storage',
        component: NewStorageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class StorageRoutingModule {
}
