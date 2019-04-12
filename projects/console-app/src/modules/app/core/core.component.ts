import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  @ViewChild('mainnav') public mainNav: MatSidenav;
  opened: boolean;
  constructor() {
    this.opened = true;
  }

  ngOnInit() {
  }

  menuButtonClick() {
    this.mainNav.toggle();
  }
}
