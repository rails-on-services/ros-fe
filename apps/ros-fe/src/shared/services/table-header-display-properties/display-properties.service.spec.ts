import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DisplayPropertiesService } from './display-properties.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DisplayPropertiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      RouterTestingModule,
      NoopAnimationsModule
    ]
  }));

  it('should be created', () => {
    const service: DisplayPropertiesService = TestBed.get(DisplayPropertiesService);
    expect(service).toBeTruthy();
  });
});
