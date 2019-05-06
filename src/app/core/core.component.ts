import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

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
    comms: 'Comms',
    campaigns: 'Campaigns'
  };

  constructor(
    private router: Router,
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
}
