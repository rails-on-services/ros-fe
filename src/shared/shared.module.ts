import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from './modules/material-design/material-design.module';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './modules/authentication';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ModalComponent,
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
    ModalComponent,
    AuthenticationModule,
    MaterialDesignModule,
    FlexLayoutModule
  ],
  entryComponents: []
})
export class SharedModule {
}
