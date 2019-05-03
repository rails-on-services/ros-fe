import {Component, OnInit} from '@angular/core';
import {MatSidenavContainer} from '@angular/material';

@Component({
  selector: 'app-comms-menu',
  templateUrl: './comms-menu.component.html',
  styleUrls: ['./comms-menu.component.scss'],
  providers: [MatSidenavContainer]
})
export class CommsMenuComponent implements OnInit {
  opened: boolean;

  constructor() {
    this.opened = true;
  }

  ngOnInit() {
  }
}
