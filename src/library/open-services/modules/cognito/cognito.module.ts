import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { OpenUiComponentsModule } from '@perx/open-ui-components';
import { CognitoService, EnvConfig } from './cognito.service';
import { HttpClientModule } from '@angular/common/http';
import { CognitoComponent } from './cognito.component';
import { JsonApiModule } from 'angular2-jsonapi';

const COMPONENTS = [CognitoComponent];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    OpenUiComponentsModule,
    HttpClientModule,
    JsonApiModule
  ],
  exports: [
    ...COMPONENTS,
    JsonApiModule
  ],
  providers: [],
  bootstrap: []
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
