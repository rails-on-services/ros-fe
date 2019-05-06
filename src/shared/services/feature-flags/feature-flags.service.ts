import { Injectable } from '@angular/core';
import { environment } from '../../../projects/console-app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  mockUsersDb = false;
  mockGroupsDb = false;
  mockPoliciesDb = false;

  constructor() {
    if (environment.mock) {
      this.mockUsersDb = true;
      this.mockGroupsDb = true;
      this.mockPoliciesDb = true;
    }
  }
}
