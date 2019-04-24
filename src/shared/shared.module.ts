import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialDesignModule} from './modules/material-design/material-design.module';
import {ModalComponent} from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthenticationModule} from './modules/authentication';

@NgModule({
  declarations: [
    ModalComponent,
  ],
  imports: [
    AuthenticationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule
  ],
  exports: [
    ModalComponent,
    AuthenticationModule,
    MaterialDesignModule
  ],
  entryComponents: []
})
export class SharedModule {
}
