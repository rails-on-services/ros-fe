import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {routes} from './app-routing.module';
import {IamModule} from '../iam/iam.module';
import {ChildrenOutletContexts} from '@angular/router';
import {CoreModule} from './core/core.module';

import {IamModule as IamServiceModule} from '@whistler/iam';
import {CognitoModule} from '../../../../whistler/cognito/src/lib/cognito.module';
import {environment} from '../../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // routes,
    IamModule,
    CoreModule,
    IamServiceModule,
    CognitoModule.forRoot({env: environment})
  ],
  providers: [ChildrenOutletContexts],
  bootstrap: [AppComponent]
})
export class AppModule { }
