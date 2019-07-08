import { Injectable } from '@angular/core';
import { IamService } from '../../../library/open-services/modules/iam/iam.service';
import { TableHeaderProperties } from '../../models/tableHeaderProperties';

@Injectable({
  providedIn: 'root'
})
export class DisplayPropertiesService {

  constructor(
    private iamService: IamService) { }

  public getCurrentUser() {
    return localStorage.getItem('currentUser') as string;
  }

  public setCurrentUser(currentUser: string) {
    localStorage.setItem('currentUser', currentUser);
  }

  public getUserDisplayProperties() {
    const currentUser = JSON.parse(this.getCurrentUser());
    return (currentUser || []).displayProperties;
  }

  public setUserDisplayProperties(displayProperties: object) {
    const currentUser = JSON.parse(this.getCurrentUser());
    currentUser.displayProperties = displayProperties;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  public updateCurrentUserDisplayProperties(displayProperties: object) {
    const currentUser = JSON.parse(this.getCurrentUser());
    const force = true;
    currentUser.displayProperties = displayProperties;
    this.setCurrentUser(JSON.stringify(currentUser));

    this.iamService.fetchUser(currentUser.id, force).subscribe(
      userDetails => {
        userDetails.displayProperties = displayProperties;
        userDetails.save();
      }
    );
  }
  public getTableShownColumns(tableDisplayProperties: TableHeaderProperties[] = []) {
    return tableDisplayProperties.filter(item => item.display).map(item => item.key);
  }
  public setTableShownColumns(shownColumns: (string | number | symbol)[], tableDisplayProperties: TableHeaderProperties[]) {
    tableDisplayProperties.map(item => {
      if (shownColumns.includes(item.key)) {
        item.display = true;
      } else {
        item.display = false;
      }
      return item;
    });
    return tableDisplayProperties;
  }
}
