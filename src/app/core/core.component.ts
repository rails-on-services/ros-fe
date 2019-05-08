import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  selectedService = 'dashboard';

  services = {
    dashboard: 'Dashboard',
    iam: 'IAM',
    cognito: 'Cognito',
    comms: 'Comms'
  };

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit() {
    if (this.router.url) {
      this.selectedService = this.router.url.split('/')[1];
    }
  }

  onClose() {
    if (this.router.url) {
      this.selectedService = this.router.url.split('/')[1];
    }
  }

  public getServices() {
    return this.services;
  }
}
