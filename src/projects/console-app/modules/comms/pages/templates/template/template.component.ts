import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CommsService, CommsTemplate } from '@perx/open-services';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnDestroy {
  private sub: any;
  template$: Observable<any>;
  id: number;

  constructor(
    private commsService: CommsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.fetchTemplate();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  detachTemplatesFromCampaign(selection: SelectionModel<CommsTemplate>) {
    this.commsService.fetchCampaign(this.id).subscribe(campaign => {
      campaign.templates = selection.selected;
      campaign.save();
    });
    console.log(selection);
  }

  private fetchTemplate() {
    this.template$ = this.commsService.fetchTemplate(this.id).pipe(
      map(templateDetails => {
        const data = templateDetails.data;
        const campaign = templateDetails.included.filter(item => item.type === 'campaigns');
        const event = templateDetails.included.filter(item => item.type === 'event');
        const template = {
          detail: {
            name: data.name,
            urn: data.urn,
            target_type: data.target_type,
            channel: data.channel,
            created_at: data.created_at,
            updated_at: data.updated_at,
            send_at: data.send_at,
          },
          campaign: {
            ...campaign.attributes
          },
          event: {
            ...event.attributes
          }
        };
        return template;
      })
    );
  }
}
