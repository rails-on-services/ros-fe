import {Component, OnInit} from '@angular/core';
import {MatSidenavContainer} from '@angular/material';

@Component({
  selector: 'app-iam-menu',
  templateUrl: './iam-menu.component.html',
  styleUrls: ['./iam-menu.component.scss'],
  providers: [MatSidenavContainer]
})
export class IamMenuComponent implements OnInit {
  events: string[] = [];
  opened: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
