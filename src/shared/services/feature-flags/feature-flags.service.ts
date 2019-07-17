import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  mockIamUsersDb: boolean = false;
  mockIamGroupsDb: boolean = false;
  mockIamPoliciesDb: boolean = false;

  constructor() {
    if (environment.mock) {
      this.mockIamUsersDb = true;
      this.mockIamGroupsDb = true;
      this.mockIamPoliciesDb = true;
    }
  }
}
