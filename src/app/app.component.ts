import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IamService } from 'src/library/open-services/modules/iam/iam.service';
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
    private displayPropertiesService: DisplayPropertiesService,
    private router: Router
  ) {
    // Just for test, make some fake login user data
    const currentUser = displayPropertiesService.getCurrentUser();
    if (!currentUser) {
      this.fetchUser();
    }
  }

  private fetchUser() {
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

        if (!Object.keys(currentUser.displayProperties).length) {
          currentUser.displayProperties = DEFAULT_SETTING.display_properties;
          userDetails.displayProperties = DEFAULT_SETTING.display_properties;
          userDetails.save().subscribe(
            res => {
              this.displayPropertiesService.setCurrentUser(JSON.stringify(currentUser));
            }
          );
        }

        this.displayPropertiesService.setCurrentUser(JSON.stringify(currentUser));
      }
    );
  }
}
