import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comms',
  templateUrl: './comms.component.html',
  styleUrls: ['./comms.component.scss']
})
export class CommsComponent implements OnInit {

  menus: {route: string, display: string}[] = [
    {route: 'home', display: 'Main'},
    {route: 'campaigns', display: 'Campaigns'},
    {route: 'messages', display: 'Messages'},
    {route: 'events', display: 'Events'},
    {route: 'templates', display: 'Templates'},
    {route: 'providers', display: 'Providers'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
