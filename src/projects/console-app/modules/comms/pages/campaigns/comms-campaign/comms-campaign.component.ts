import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommsService, CommsCampaign, CommsEvent, CommsTemplate } from '@perx/open-services';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { TemplatesComponent } from './../../templates/templates.component';

@Component({
  selector: 'app-comms-campaign',
  templateUrl: './comms-campaign.component.html',
  styleUrls: ['./comms-campaign.component.scss'],
})
export class CommsCampaignComponent implements OnInit, OnDestroy {
  @ViewChild(TemplatesComponent) templates: TemplatesComponent;
  private sub: any;
  campaign$: Observable<any>;
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
    this.fetchCampaign();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  detachTemplatesFromCampaign(selection: SelectionModel<CommsTemplate>) {
    this.commsService.fetchCampaign(this.id).subscribe(campaign => {
      campaign.templates = campaign.templates.filter(campaign => campaign.id !== selection.selected[0].id);
      campaign.save().subscribe(
        () => {
          this.templates.fetchTemplates();
        }
      );
    });
    console.log(selection);
  }

  attachTemplatesToCampaign() {
    this.router.navigate(['attach-templates'], { relativeTo: this.route });
  }

  private fetchCampaign() {
    this.campaign$ = this.commsService.fetchCampaign(this.id).pipe(
      map(data => {
        const campaign = {
          ownerId: data.ownerId,
          ownerType: data.ownerType,
          updateAt: data.updatedAt
        };
        return campaign;
      })
    );
  }
}
