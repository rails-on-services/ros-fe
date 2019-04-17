import { TestBed } from '@angular/core/testing';

import { NewUserResolverService } from './new-user-resolver.service';

describe('NewUserResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewUserResolverService = TestBed.get(NewUserResolverService);
    expect(service).toBeTruthy();
  });
});
