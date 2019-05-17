import { TestBed } from '@angular/core/testing';

import { NewCognitoUserResolverService } from './new-cognito-user-resolver.service';

describe('NewCognitoUserResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewCognitoUserResolverService = TestBed.get(NewCognitoUserResolverService);
    expect(service).toBeTruthy();
  });
});
