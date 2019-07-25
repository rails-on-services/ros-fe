import { Component, OnInit } from '@angular/core';
import { CommsService } from '@perx/open-services/dist/open-services';

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

  ngOnInit(): void {
    this.fetchCampaigns();
    this.fetchEvents();
    this.fetchTemplates();
    this.fetchProviders();
    this.fetchMessages();
  }

  fetchCampaigns(): void {
    this.commsService.fetchCampaigns().subscribe(
      response => {
        this.campaignsCount = response.length;
      }
    );
  }
  fetchEvents(): void {
    this.commsService.fetchEvents().subscribe(
      response => {
        this.eventsCount = response.length;
      }
    );
  }
  fetchTemplates(): void {
    this.commsService.fetchTemplates().subscribe(
      response => {
        this.templatesCount = response.length;
      }
    );
  }
  fetchProviders(): void {
    this.commsService.fetchProviders().subscribe(
      response => {
        this.providersCount = response.length;
      }
    );
  }
  fetchMessages(): void {
    this.commsService.fetchMessages().subscribe(
      response => {
        this.messagesCount = response.length;
      }
    );
  }
}
