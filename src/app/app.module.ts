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
import { CommsModule as CommsServiceModule } from '@perx/open-services';
import { environment } from '../projects/console-app/environments/environment';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// used to create fake backend
import { HttpRequestInterceptor } from '../helpers/http-request.interceptor';
import { MockRequestInterceptor } from '../helpers/mock-request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PublicModule } from './public/public.module';
import { CORE_SERVICES_MENU, coreServicesMenuValue } from './core/core-services-menu.value';

const isMock = environment.mock;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    PublicModule,
    IamServiceModule,
    CommsServiceModule,
    CognitoServiceModule.forRoot({ env: environment })
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
