import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {SharedModule} from '../../../shared/shared.module';
import {LoginComponent} from './pages/login/login.component';
import {CoreRoutingModule} from './core-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    LoginComponent
  ]
})
export class CoreModule { }
