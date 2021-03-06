import { Component } from '@angular/core';
import { IamService } from '@perx/open-services';
import { DEFAULT_SETTING } from '../shared/constant/displayPropertiesContant';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private iamService: IamService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
    // Just for test, make some fake login user data
    const currentUser = displayPropertiesService.getCurrentUser();
    if (!currentUser) {
      this.fetchUser();
    }
  }

  private fetchUser(): void {
    const userInfo = {
      id: 1
    };
    this.iamService.fetchUser(userInfo.id).subscribe(
      userDetails => {
        const currentUser = {
          id: userDetails.id,
          displayProperties: userDetails.displayProperties,
          urn: userDetails.urn,
          username: userDetails.username,
        };

        // Used to update display properties
        if (!Object.keys(currentUser.displayProperties).length) {
          currentUser.displayProperties = DEFAULT_SETTING.display_properties;
          userDetails.displayProperties = DEFAULT_SETTING.display_properties;
          userDetails.save();
        }

        this.displayPropertiesService.setCurrentUser(JSON.stringify(currentUser));
      }
    );
  }
}
