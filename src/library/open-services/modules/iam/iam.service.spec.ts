import { TestBed } from '@angular/core/testing';

import { IamService } from './iam.service';
import { HttpClientModule } from '@angular/common/http';

describe('IamService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: IamService = TestBed.get(IamService);
    expect(service).toBeTruthy();
  });
});
