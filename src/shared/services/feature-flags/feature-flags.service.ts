import { Injectable } from '@angular/core';
import { environment } from 'src/projects/console-app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  mockUsersDb = false;
  mockGroupsDb = false;
  mockPoliciesDb = false;
  mockRewardsDb = false;

  constructor() {
    if (environment.mock) {
      this.mockUsersDb = true;
      this.mockGroupsDb = true;
      this.mockPoliciesDb = true;
      this.mockRewardsDb = true;
    }
  }
}
