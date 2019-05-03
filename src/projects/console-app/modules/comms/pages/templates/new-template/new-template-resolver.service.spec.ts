import { TestBed } from '@angular/core/testing';

import { NewTemplateResolverService } from './new-template-resolver.service';

describe('NewUserResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewTemplateResolverService = TestBed.get(NewTemplateResolverService);
    expect(service).toBeTruthy();
  });
});
