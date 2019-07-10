import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { StorageService, EnvConfig } from './storage.service';
import { HttpClientModule } from '@angular/common/http';
import { JsonApiModule } from 'angular2-jsonapi';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    JsonApiModule
  ],
  providers: [],
  bootstrap: []
})

export class StorageModule {
  constructor(@Optional() @SkipSelf() parentModule: StorageModule) {
    if (parentModule) {
      throw new Error(
        'StorageModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: StorageModule,
      providers: [
        StorageService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
