import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommsService, CommsTemplate } from '@perx/open-services';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { TemplatesComponent } from '../../templates/templates.component';

@Component({
  selector: 'app-comms-campaign',
  templateUrl: './comms-campaign.component.html',
  styleUrls: ['./comms-campaign.component.scss'],
})
export class CommsCampaignComponent implements OnInit, OnDestroy {
  @ViewChild(TemplatesComponent) templatesComponent: TemplatesComponent;
  private sub: any;
  campaign$: Observable<any>;
  id: number;

  constructor(
    private commsService: CommsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params[`id`];
    });
    this.fetchCampaign();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  detachTemplatesFromCampaign(selection: SelectionModel<CommsTemplate>): void {
    const selectedTemplates = selection.selected.map(item => item.id);
    this.commsService.fetchCampaign(this.id)
      .pipe(
        map(campaign => {
          campaign.templates = campaign.templates.filter(item => !selectedTemplates.includes(item.id));
          return campaign;
        }),
        switchMap(campaign => campaign.save())
      ).subscribe(
        () => {
          this.templatesComponent.clearSelection();
          this.templatesComponent.fetchTemplates();
        }
      );
  }

  attachTemplatesToCampaign(): void {
    this.router.navigate(['attach-templates'], { relativeTo: this.route });
  }

  private fetchCampaign(): void {
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
