import { TestBed } from '@angular/core/testing';

import { NewEventResolverService } from './new-event-resolver.service';

describe('NewUserResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewEventResolverService = TestBed.get(NewEventResolverService);
    expect(service).toBeTruthy();
  });
});
