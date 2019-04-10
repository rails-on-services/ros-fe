import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { sideNavAnimation, sideNavContainerAnimation } from './animations/sidenav.animations';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  animations: [sideNavAnimation('6rem'), sideNavContainerAnimation('6rem')]
})
export class CoreComponent implements OnInit {

  @ViewChild('mainnav') public mainNav: MatSidenav;
  mainNavOpened: boolean;

  constructor() {
    this.mainNavOpened = true;
  }

  ngOnInit() {
  }

  menuButtonClick() {
    this.mainNavOpened = !this.mainNavOpened;
  }
}
