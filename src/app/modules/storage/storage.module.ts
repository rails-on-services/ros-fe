import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageComponent } from './storage.component';
import { StorageRoutingModule } from './storage-routing.module';
import { NewStorageComponent } from './new-storage/new-storage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { OpenUiComponentsModule, ConfirmationModal, ManageColumnModal } from '@perx/open-ui-components';
import { ServiceMenuModule } from 'src/app/core/components/service-menu/service-menu.module';
import { NgxFileDropModule } from 'ngx-file-drop';

const COMPONENTS = [
  StorageComponent,
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
