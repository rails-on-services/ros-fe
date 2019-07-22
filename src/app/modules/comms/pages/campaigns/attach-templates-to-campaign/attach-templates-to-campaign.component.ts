import { CommsService, CommsTemplate, CommsCampaign } from '@perx/open-services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { DisplayPropertiesService } from 'src/shared/services/table-header-display-properties/display-properties.service';

@Component({
  selector: 'app-attach-templates-to-campaign',
  templateUrl: './attach-templates-to-campaign.component.html',
  styleUrls: ['./attach-templates-to-campaign.component.scss']
})
export class AttachTemplatesToCampaignComponent implements OnInit, OnDestroy {
  private sub: any;
  campaignId: number;
  selection: SelectionModel<CommsTemplate>;
  shownColumns: (string | number | symbol)[];
  campaign$: Observable<any>;
  templateTableDisplayProperties: TableHeaderProperties[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commsService: CommsService,
    private displayPropertiesService: DisplayPropertiesService
  ) {
  }

  ngOnInit(): void {
    this.shownColumns = ['name', 'content', 'status', 'createdAt', 'updatedAt'];
    this.sub = this.route.params.subscribe(params => {
      this.campaignId = params[`id`];
    });
    this.displayPropertiesService.setTableDisplayProperties('essentials', 'comms', 'templates-table');
    this.templateTableDisplayProperties = this.displayPropertiesService.getTableDisplayProperties();
    this.fetchTemplatesNotInCampaign();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  getTemplateInfo(template: CommsTemplate) {
    const templateDetails = { id: template.id };
    const keys = this.templateTableDisplayProperties.map(item => item.key);

    keys.forEach(key => {
      templateDetails[key] = template[key];
    });

    return templateDetails;
  }

  // tslint:disable-next-line: typedef
  getCampaignInfo(campaign: CommsCampaign, templates: CommsTemplate[]) {
    const campaignInfo = {
      id: campaign.id,
      templates: templates.map(template => {
        return this.getTemplateInfo(template);
      }),
      link: `campaigns/${campaign.id}`
    };
    return campaignInfo;
  }

  reloadTable(): void {
    if (this.selection) {
      this.selection.clear();
    }
  }

  changeTableHeaderSetting(shownColumns: (string | number | symbol)[] = []): void {
    this.shownColumns = shownColumns;
  }

  fetchTemplatesNotInCampaign(): void {
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

  get columnProperties(): TableHeaderProperties[] {
    return this.templateTableDisplayProperties;
  }

  onTemplatesSelectionChange(selection: SelectionModel<CommsTemplate>): void {
    this.selection = selection;
  }

  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onEventsSelectionChange(selection: SelectionModel<CommsTemplate>): void {
    this.selection = selection;
  }

  attachTemplatesToCampaign(): void {
    const selectedTemplateIds = this.selection.selected.map(item => item.id);
    const allTemplates$ = this.commsService.fetchTemplates();
    const currentCampaign$ = this.commsService.fetchCampaign(this.campaignId);

    forkJoin(allTemplates$, currentCampaign$).pipe(
      map(([templatesData, campaignData]) => {
        const selectedTemplates = templatesData.filter(template => selectedTemplateIds.includes(template.id));
        campaignData.groups = [...campaignData.templates || [], ...selectedTemplates];
        return campaignData;
      }),
      switchMap(user => user.save())
    ).subscribe(
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
