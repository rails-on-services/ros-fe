import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesComponent } from './pages/files/files.component';
import { StorageComponent } from './storage.component';
import { NewFileComponent } from './pages/new-file/new-file.component';

const router: Routes = [
  {
    path: '',
    redirectTo: 'files',
    pathMatch: 'full'
  },
  {
    path: '',
    component: StorageComponent,
    children: [
      {
        path: 'files',
        component: FilesComponent,
      },
      {
        path: 'files/new-file',
        component: NewFileComponent
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
