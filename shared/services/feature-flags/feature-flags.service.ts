import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  mockUsersDb = false;
  mockGroupsDb = false;
  mockPoliciesDb = false;

  constructor() {
    if (!environment.production) {
      this.mockUsersDb = false;
      this.mockGroupsDb = true;
      this.mockPoliciesDb = true;
    }
  }
}
