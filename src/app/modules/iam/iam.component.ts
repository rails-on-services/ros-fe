import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iam',
  templateUrl: './iam.component.html',
  styleUrls: ['./iam.component.scss']
})
export class IamComponent implements OnInit {

  menus = [
    {route: 'home', display: 'Main'},
    {route: 'users', display: 'Users'},
    {route: 'groups', display: 'Groups'},
    {route: 'policies', display: 'Policies'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
