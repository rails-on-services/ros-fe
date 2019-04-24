import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {routes} from './app-routing.module';
import { ChildrenOutletContexts } from '@angular/router';
import { CoreModule } from './core/core.module';

import { IamModule as IamServiceModule } from '@perx/open-services';
import { CognitoModule as CognitoServiceModule } from '@perx/open-services';
import { environment } from '../projects/console-app/environments/environment';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// used to create fake backend
import { MockRequestInterceptor, HttpRequestInterceptor } from 'helpers/request-interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const isMock = environment.mock;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    IamServiceModule,
    CognitoServiceModule.forRoot({ env: environment })
  ],
  providers: [
    ChildrenOutletContexts,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: isMock ? MockRequestInterceptor : HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
