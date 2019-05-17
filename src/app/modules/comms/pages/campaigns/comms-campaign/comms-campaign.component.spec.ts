import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommsCampaignComponent } from './comms-campaign.component';

describe('CommsCampaignComponent', () => {
  let component: CommsCampaignComponent;
  let fixture: ComponentFixture<CommsCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommsCampaignComponent ]
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
