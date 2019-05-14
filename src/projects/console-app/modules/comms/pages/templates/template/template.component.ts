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
  }

  private fetchTemplate() {
    this.template$ = this.commsService.fetchTemplate(this.id).pipe(
      map(templateDetails => {
        const campaigns = templateDetails.lastSyncModels.filter(item => item.type === 'campaigns').map(item => ({...item.attributes}));
        // const events = templateDetails.lastSyncModels.filter(item => item.type === 'events').map(item => ({...item.attributes}));
        const template = {
          detail: {
            name: templateDetails.name,
            status: templateDetails.status,
            created_at: templateDetails.createdAt,
            updated_at: templateDetails.updatedAt
          },
          campaigns,
          // events
        };
        return template;
      })
    );
  }
}
