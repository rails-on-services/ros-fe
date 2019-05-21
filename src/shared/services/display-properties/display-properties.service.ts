import { IamService } from './../../../library/open-services/modules/iam/iam.service';
import { Injectable } from '@angular/core';
import { TokenStorage } from 'src/shared/modules/authentication/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayPropertiesService {

  constructor(
    private tokenStorage: TokenStorage,
    private iamService: IamService) {}

    public getCurrentUser() {
      return localStorage.getItem('currentUser') as string;
    }

    public setCurrentUser(currentUser: string) {
      localStorage.setItem('currentUser', currentUser);
    }

    public getUserDisplayProperties() {
      const currentUser = JSON.parse(this.getCurrentUser());
      return currentUser.displayProperties;
    }

    public setUserDisplayProperties(displayProperties: object) {
      const currentUser = JSON.parse(this.getCurrentUser());
      currentUser.displayProperties = displayProperties;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    public updateUserDisplayProperties(displayProperties: object) {
      const userId = JSON.parse(this.getCurrentUser()).id;

      this.iamService.fetchUser(userId).subscribe(
        userDetails => {
          userDetails.displayProperties = displayProperties;
          userDetails.save();
        }
      );
    }
}
