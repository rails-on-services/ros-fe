import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CognitoComponent } from './cognito.component';
import { HttpClientModule } from '@angular/common/http';
import { CognitoService, EnvConfig } from './cognito.service';
import { JsonApiModule } from 'angular2-jsonapi';

@NgModule({
  declarations: [CognitoComponent],
  imports: [
    HttpClientModule,
    JsonApiModule
  ],
  exports: [
    CognitoComponent,
    JsonApiModule
  ]
})

export class CognitoModule {
  constructor(@Optional() @SkipSelf() parentModule: CognitoModule) {
    if (parentModule) {
      throw new Error(
        'CognitoModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: CognitoModule,
      providers: [
        CognitoService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
