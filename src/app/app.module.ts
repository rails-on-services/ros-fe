import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChildrenOutletContexts } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { IamModule as IamServiceModule } from '@perx/open-services';
import { CognitoModule as CognitoServiceModule } from '@perx/open-services';
import { CommsModule as CommsServiceModule } from '@perx/open-services';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { PublicModule } from './public/public.module';
import { CORE_SERVICES_MENU, coreServicesMenuValue } from './core/core-services-menu.value';
import { HttpRequestInterceptor } from '../helpers/http-request.interceptor';
import { MockRequestInterceptor } from '../helpers/mock-request.interceptor';
import { HeaderModule } from './core/components/header/header.module';
import { APP_BASE_HREF } from '@angular/common';

const isMock = environment.mock;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HeaderModule,
    PublicModule,
    IamServiceModule,
    CommsServiceModule,
    CognitoServiceModule
  ],
  providers: [
    ChildrenOutletContexts,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: isMock ? MockRequestInterceptor : HttpRequestInterceptor,
      multi: true
    },
    {
      provide: CORE_SERVICES_MENU,
      useValue: coreServicesMenuValue
    },
    {provide: APP_BASE_HREF, useValue: environment.baseHref }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
