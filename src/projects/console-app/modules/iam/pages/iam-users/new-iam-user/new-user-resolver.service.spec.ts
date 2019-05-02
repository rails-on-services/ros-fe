import { TestBed } from '@angular/core/testing';

import { NewIamUserResolverService } from './new-iam-user-resolver.service';

describe('NewIamUserResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewIamUserResolverService = TestBed.get(NewIamUserResolverService);
    expect(service).toBeTruthy();
  });
});
