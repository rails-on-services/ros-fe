import { CommsService, CommsEvent, CommsCampaign } from '@perx/open-services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-attach-events-to-campaign',
  templateUrl: './attach-events-to-campaign.component.html',
  styleUrls: ['./attach-events-to-campaign.component.scss']
})
export class AttachEventsToCampaignComponent implements OnInit, OnDestroy {
  private sub: any;
  campaignId: number;
  selection: SelectionModel<CommsEvent>;
  shownColumns: string[];
  campaign$: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commsService: CommsService) { }

  ngOnInit() {
    this.shownColumns = ['eventname', 'urn', 'created_at'];
    this.sub = this.route.params.subscribe(params => {
      this.campaignId = params['id'];
    });
    this.fetchEventsNotInCampaign();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getEventInfo(event: CommsEvent) {
    const eventDetails = { id: event.id };
    const keys = Object.keys(event.getColumnProperties());

    keys.forEach(key => {
      eventDetails[key] = event[key];
    });

    return eventDetails;
  }

  getCampaignInfo(campaign: CommsCampaign, events: CommsEvent[]){
    const campaignInfo =  {
      id: campaign.id,
      events: events.map(event => {
        return this.getEventInfo(event);
      }),
      link: `campaigns/${campaign.id}`
    };
    return campaignInfo;
  }

  fetchEventsNotInCampaign() {
    this.campaign$ = forkJoin(this.commsService.fetchEvents(), this.commsService.fetchCampaign(this.campaignId)).pipe(
      map(([eventsData, campaignData]) => {
        const commsEvents = eventsData.getModels();
        const eventsInCampaign = campaignData.events || [];

        const events = commsEvents.filter(singleEvent => {
          const notInCampaign = eventsInCampaign.some(eventInCampaign => {
            return eventInCampaign.id !== singleEvent.id;
          });
          if (notInCampaign) {
            return singleEvent;
          }
        });
        const campaignDetails = this.getCampaignInfo(campaignData, events);

        return campaignDetails;
      })
    );
  }

  get columnProperties() {
    return CommsEvent.prototype.getColumnProperties();
  }

  onEventsSelectionChange(selection: SelectionModel<CommsEvent>) {
    this.selection = selection;
  }

  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  attachEventsToCampaign() {

  }
}
