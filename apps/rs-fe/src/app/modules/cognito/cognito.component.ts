import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cognito',
  templateUrl: './cognito.component.html',
  styleUrls: ['./cognito.component.scss']
})
export class CognitoComponent implements OnInit {

  menus: {route: string, display: string}[] = [
    {route: 'home', display: 'Dashboard'},
    {route: 'users', display: 'Users'},
    {route: 'pools', display: 'Pools'},
    {route: 'apps', display: 'Apps'}
  ];

  ngOnInit(): void {
  }

}
