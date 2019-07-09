import { Component, OnInit } from '@angular/core';
import { CommsService } from '@perx/open-services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  campaignsCount: number;
  eventsCount: number;
  templatesCount: number;
  providersCount: number;
  messagesCount: number;

  constructor(
    private commsService: CommsService
  ) {
    this.campaignsCount = 0;
    this.eventsCount = 0;
    this.templatesCount = 0;
    this.providersCount = 0;
    this.messagesCount = 0;
  }

  ngOnInit() {
    this.fetchCampaigns();
    this.fetchEvents();
    this.fetchTemplates();
    this.fetchProviders();
    this.fetchMessages();
  }

  fetchCampaigns() {
    this.commsService.fetchCampaigns().subscribe(
      response => {
        this.campaignsCount = response.length;
      }
    );
  }
  fetchEvents() {
    this.commsService.fetchEvents().subscribe(
      response => {
        this.eventsCount = response.length;
      }
    );
  }
  fetchTemplates() {
    this.commsService.fetchTemplates().subscribe(
      response => {
        this.templatesCount = response.length;
      }
    );
  }
  fetchProviders() {
    this.commsService.fetchProviders().subscribe(
      response => {
        this.providersCount = response.length;
      }
    );
  }
  fetchMessages() {
    this.commsService.fetchMessages().subscribe(
      response => {
        this.messagesCount = response.length;
      }
    );
  }
}
