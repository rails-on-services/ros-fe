import { TestBed } from '@angular/core/testing';

import { CognitoService } from './cognito.service';
import { HttpClientModule } from '@angular/common/http';

describe('CognitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: CognitoService = TestBed.get(CognitoService);
    expect(service).toBeTruthy();
  });
});
