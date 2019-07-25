import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommsCampaignComponent } from './comms-campaign.component';
import { SharedModule } from 'src/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableActionsManagementComponent, FilterableTableComponent } from '@perx/open-ui-components';
import { HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './../../events/events.component';
import { TemplatesComponent } from '../../templates/templates.component';

describe('CommsCampaignComponent', () => {
  let component: CommsCampaignComponent;
  let fixture: ComponentFixture<CommsCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientModule
      ],
      declarations: [
        CommsCampaignComponent,
        TemplatesComponent,
        EventsComponent,
        TableActionsManagementComponent,
        FilterableTableComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommsCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
