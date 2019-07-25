import { Injectable } from '@angular/core';
import { IamService } from '@perx/open-services/dist/open-services';
import { TableHeaderProperties } from '../../models/tableHeaderProperties';

@Injectable({
  providedIn: 'root'
})
export class DisplayPropertiesService {
  currentTableDisplayProperties: TableHeaderProperties[];
  tablePlatform: string;
  tableModule: string;
  tableName: string;

  constructor(
    private iamService: IamService) { }

  public getCurrentUser(): string {
    return localStorage.getItem('currentUser') as string;
  }

  public setCurrentUser(currentUser: string): void {
    localStorage.setItem('currentUser', currentUser);
  }

  public getUserDisplayProperties(): any {
    const currentUser = JSON.parse(this.getCurrentUser());
    return (currentUser || []).displayProperties;
  }

  public setUserDisplayProperties(displayProperties: object): void {
    const currentUser = JSON.parse(this.getCurrentUser());
    currentUser.displayProperties = displayProperties;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  public updateCurrentUserDisplayProperties(): void {
    const currentUser = JSON.parse(this.getCurrentUser());
    currentUser.displayProperties[this.tablePlatform][this.tableModule][`tables`][this.tableName] = this.currentTableDisplayProperties;
    this.setCurrentUser(JSON.stringify(currentUser));

    this.iamService.fetchUser(currentUser.id).subscribe(
      userDetails => {
        userDetails.displayProperties[this.tablePlatform][this.tableModule][`tables`][this.tableName] = this.currentTableDisplayProperties;
        userDetails.save();
      }
    );
  }
  public getTableShownColumns(tableDisplayProperties: TableHeaderProperties[] = []): string[] {
    return tableDisplayProperties.filter(item => item.display).map(item => item.key);
  }
  public setTableShownColumns(shownColumns: (string | number | symbol)[]): void {
    this.currentTableDisplayProperties = this.currentTableDisplayProperties.map(item => {
      if (shownColumns.includes(item.key)) {
        item.display = true;
      } else {
        item.display = false;
      }
      return item;
    });
  }

  getTableDisplayProperties(): TableHeaderProperties[] {
    return this.currentTableDisplayProperties;
  }

  setTableDisplayProperties(tablePlatform: string, tableModule: string, tableName: string): void {
    this.tablePlatform = tablePlatform;
    this.tableModule = tableModule;
    this.tableName = tableName;
    const displayProperties = this.getUserDisplayProperties();
    this.currentTableDisplayProperties = displayProperties && displayProperties[tablePlatform][tableModule][`tables`][tableName];
  }
}
