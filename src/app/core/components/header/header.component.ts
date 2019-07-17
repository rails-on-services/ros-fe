import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CORE_SERVICES_MENU } from '../../core-services-menu.value';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedService: any = null;

  routerUrl: string = null;

  constructor(
    public router: Router,
    @Inject(CORE_SERVICES_MENU) public services: any,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setSelectedService();
      }
    });

    this.setSelectedService();
  }

  setSelectedService(): void {
    if (this.router.url) {
      this.routerUrl = this.router.url;
      this.selectedService = this.services.find(s => this.router.url.indexOf(s.url) === 0);
    }
  }
}
