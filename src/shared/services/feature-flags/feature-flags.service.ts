import { Injectable } from '@angular/core';
import { environment } from '../../../projects/console-app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  mockIamUsersDb = false;
  mockIamGroupsDb = false;
  mockIamPoliciesDb = false;

  constructor() {
    if (environment.mock) {
      this.mockIamUsersDb = true;
      this.mockIamGroupsDb = true;
      this.mockIamPoliciesDb = true;
    }
  }
}
