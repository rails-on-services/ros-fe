import { CommsService, CommsTemplate, CommsCampaign } from '@perx/open-services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/display-properties/display-properties.service';

@Component({
  selector: 'app-attach-templates-to-campaign',
  templateUrl: './attach-templates-to-campaign.component.html',
  styleUrls: ['./attach-templates-to-campaign.component.scss']
})
export class AttachTemplatesToCampaignComponent implements OnInit, OnDestroy {
  private sub: any;
  campaignId: number;
  selection: SelectionModel<CommsTemplate>;
  shownColumns: string[];
  campaign$: Observable<any>;
  displayProperties: object;
  templateTableDisplayProperties: TableHeaderProperties[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commsService: CommsService,
    private displayPropertiesService: DisplayPropertiesService
    ) { 
      this.displayProperties = displayPropertiesService.getUserDisplayProperties();
      // tslint:disable-next-line: no-string-literal
      this.templateTableDisplayProperties = this.displayProperties['essentials']['comms']['tables']['templates-table'];
    }

  ngOnInit() {
    this.shownColumns = ['name', 'content', 'status', 'createdAt', 'updatedAt'];
    this.sub = this.route.params.subscribe(params => {
      this.campaignId = params['id'];
    });
    this.fetchTemplatesNotInCampaign();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTemplateInfo(template: CommsTemplate) {
    const templateDetails = { id: template.id };
    const keys = this.templateTableDisplayProperties.map(item => item.key);

    keys.forEach(key => {
      templateDetails[key] = template[key];
    });

    return templateDetails;
  }

  getCampaignInfo(campaign: CommsCampaign, templates: CommsTemplate[]){
    const campaignInfo =  {
      id: campaign.id,
      templates: templates.map(template => {
        return this.getTemplateInfo(template);
      }),
      link: `campaigns/${campaign.id}`
    };
    return campaignInfo;
  }

  fetchTemplatesNotInCampaign() {
    this.campaign$ = forkJoin(this.commsService.fetchTemplates(), this.commsService.fetchCampaign(this.campaignId)).pipe(
      map(([templatesData, campaignData]) => {
        const templatesInCampaign = campaignData.templates || [];
        const templates = templatesData.filter(singleTemplate => {
          if (templatesInCampaign.length <= 0) { return true; }
          const isInCampaign = templatesInCampaign.some(templateInCampaign => {
            return templateInCampaign.id === singleTemplate.id;
          });

          return !isInCampaign;
        });
        const campaignDetails = this.getCampaignInfo(campaignData, templates);

        return campaignDetails;
      })
    );
  }

  get columnProperties() {
    return this.templateTableDisplayProperties;
  }

  onTemplatesSelectionChange(selection: SelectionModel<CommsTemplate>) {
    this.selection = selection;
  }

  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onEventsSelectionChange(selection: SelectionModel<CommsTemplate>) {
    this.selection = selection;
  }

  attachTemplatesToCampaign() {
    let selectedTemplates = [];
    const selectedTemplateIds = this.selection.selected.map(item => item.id);
    this.commsService.fetchTemplates()
    .subscribe(templates => {
      templates.forEach(template => {
        if (selectedTemplateIds.includes(template.id)) {
          selectedTemplates.push(template);
        }
      });
    });
    if (selectedTemplates.length > 0) {
      this.commsService.fetchCampaign(this.campaignId).subscribe(campaign => {
          campaign.templates = [ ...campaign.templates || [], ...selectedTemplates];
          campaign.save().subscribe(
            () => this.router.navigate(['../'], { relativeTo: this.route })
          );
        }
      );
    }
  }
}
