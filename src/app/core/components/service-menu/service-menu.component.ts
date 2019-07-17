import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-menu',
  templateUrl: './service-menu.component.html',
  styleUrls: ['./service-menu.component.scss']
})
export class ServiceMenuComponent implements OnInit {

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

  ngOnInit() {
  }

  debugLog(log: any) {
    console.log(log);
  }
}
