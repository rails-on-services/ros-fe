import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommsService, CommsTemplate } from '@perx/open-services';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { TemplatesComponent } from '../../templates/templates.component';

@Component({
  selector: 'app-comms-campaign',
  templateUrl: './comms-campaign.component.html',
  styleUrls: ['./comms-campaign.component.scss'],
})
export class CommsCampaignComponent implements OnInit, OnDestroy {
  @ViewChild(TemplatesComponent) templatesComponnet: TemplatesComponent;
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
    const selectedTemplates = selection.selected.map(item => item.id);
    this.commsService.fetchCampaign(this.id).subscribe(campaign => {
      campaign.templates = campaign.templates.filter(item => !selectedTemplates.includes(item.id));
      campaign.save().subscribe(
        () => {
          this.templatesComponnet.clearSelection();
          this.templatesComponnet.fetchTemplates();
        }
      );
    });
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
