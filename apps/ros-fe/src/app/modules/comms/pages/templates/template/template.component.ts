import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CommsService } from '@perx/open-services/dist/open-services';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params[`id`];
    });
    this.fetchTemplate();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private fetchTemplate(): void {
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
