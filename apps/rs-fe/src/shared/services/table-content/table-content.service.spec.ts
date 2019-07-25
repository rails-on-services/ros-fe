import { TestBed } from '@angular/core/testing';

import { TableContentService } from './table-content.service';

describe('TableContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableContentService = TestBed.get(TableContentService);
    expect(service).toBeTruthy();
  });
});
