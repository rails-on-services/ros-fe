import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpenUiComponentsModule, ConfirmationModal, ManageColumnModal } from '@perx/open-ui-components';
import { ServiceMenuModule } from 'src/app/core/components/service-menu/service-menu.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { StorageComponent } from './storage.component';
import { FilesComponent } from './pages/files/files.component';
import { StorageRoutingModule } from './storage-routing.module';
import { NewStorageComponent } from './pages/new-storage/new-storage.component';
import { SharedModule } from '../../../shared/shared.module';

const COMPONENTS = [
  StorageComponent,
  FilesComponent,
  NewStorageComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    StorageRoutingModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OpenUiComponentsModule,
    ServiceMenuModule,
    NgxFileDropModule
  ],
  exports: [
    ...COMPONENTS,
    StorageRoutingModule
  ],
  entryComponents: [
    ManageColumnModal,
    ConfirmationModal,
    NewStorageComponent
    ]
})
export class StorageModule {
}
