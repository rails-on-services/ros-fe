import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-menu',
  templateUrl: './service-menu.component.html',
  styleUrls: ['./service-menu.component.scss']
})
export class ServiceMenuComponent {

  @Input() menus: {route: string, display: string}[] = [];

  testRoutes: {route: string, display: string}[] = [
    {route: 'home', display: 'Home'},
    {route: 'users', display: 'Users'},
    {route: 'groups', display: 'Groups'},
    {route: 'policies', display: 'Policies'}
  ];

  opened: boolean;

  constructor() {
    this.opened = true;
  }

  debugLog(log: any): void {
    console.log(log);
  }
}
