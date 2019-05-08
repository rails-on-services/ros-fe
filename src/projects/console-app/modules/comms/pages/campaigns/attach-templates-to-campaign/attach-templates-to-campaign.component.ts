import { CommsService, CommsTemplate, CommsCampaign } from '@perx/open-services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commsService: CommsService) { }

  ngOnInit() {
    this.shownColumns = ['templatename', 'urn', 'created_at'];
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
    const keys = Object.keys(template.getColumnProperties());

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
        const commsTemplates = templatesData.getModels();
        const templatesInCampaign = campaignData.templates || [];

        const templates = commsTemplates.filter(singleTemplate => {
          const notInCampaign = templatesInCampaign.some(templateInCampaign => {
            return templateInCampaign.id !== singleTemplate.id;
          });
          if (notInCampaign) {
            return singleTemplate;
          }
        });
        const campaignDetails = this.getCampaignInfo(campaignData, templates);

        return campaignDetails;
      })
    );
  }

  get columnProperties() {
    return CommsTemplate.prototype.getColumnProperties();
  }

  onTemplatesSelectionChange(selection: SelectionModel<CommsTemplate>) {
    this.selection = selection;
  }

  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  attachTemplatesToCampaign() {

  }
}
