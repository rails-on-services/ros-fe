import { TestBed } from '@angular/core/testing';

import { DisplayPropertiesService } from './display-properties.service';

describe('DisplayPropertiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayPropertiesService = TestBed.get(DisplayPropertiesService);
    expect(service).toBeTruthy();
  });
});
