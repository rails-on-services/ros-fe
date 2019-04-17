import {Component, OnInit} from '@angular/core';
import {MatSidenavContainer} from '@angular/material';

@Component({
  selector: 'app-cognito-menu',
  templateUrl: './cognito-menu.component.html',
  styleUrls: ['./cognito-menu.component.scss'],
  providers: [MatSidenavContainer]
})
export class CognitoMenuComponent implements OnInit {
  opened: boolean;

  constructor() {
    this.opened = true;
  }

  ngOnInit() {
  }
}
