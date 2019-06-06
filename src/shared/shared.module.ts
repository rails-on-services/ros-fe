import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from './modules/material-design/material-design.module';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './modules/authentication';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableActionsManagementComponent } from './components/table-actions-management/table-actions-management.component';

const COMPONENTS = [
  ModalComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    TableActionsManagementComponent
  ],
  imports: [
    AuthenticationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    FlexLayoutModule
  ],
  exports: [
    ...COMPONENTS,
    AuthenticationModule,
    MaterialDesignModule,
    FlexLayoutModule
  ],
  entryComponents: []
})
export class SharedModule {
}
