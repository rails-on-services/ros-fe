import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {routes} from './app-routing.module';
import { ChildrenOutletContexts } from '@angular/router';
import { CoreModule } from './core/core.module';

import { IamModule as IamServiceModule } from '@whistler/iam';
import { CognitoModule as CognitoServiceModule } from '@whistler/cognito';
import { environment } from '../../environments/environment';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    IamServiceModule,
    CognitoServiceModule.forRoot({ env: environment })
  ],
  providers: [ChildrenOutletContexts],
  bootstrap: [AppComponent]
})
export class AppModule {
}
