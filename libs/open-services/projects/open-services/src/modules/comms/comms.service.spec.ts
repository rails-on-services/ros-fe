import { TestBed } from '@angular/core/testing';

import { CommsService } from './comms.service';
import { HttpClientModule } from '@angular/common/http';

describe('IamService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: CommsService = TestBed.get(CommsService);
    expect(service).toBeTruthy();
  });
});
