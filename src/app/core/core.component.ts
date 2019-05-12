import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CORE_SERVICES_MENU } from './core-services-menu.value';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  selectedService = null;

  constructor(
    public router: Router,
    @Inject(CORE_SERVICES_MENU) public services: any,
  ) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setSelectedService();
      }
    });

    this.setSelectedService();
  }

  setSelectedService() {
    if (this.router.url) {
      this.selectedService = this.services.find(s => this.router.url.indexOf(s.url) === 0);
    }
  }
}
