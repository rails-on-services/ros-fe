import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachTemplatesToCampaignComponent } from './attach-templates-to-campaign.component';

describe('AttachTemplatesToCampaignComponent', () => {
  let component: AttachTemplatesToCampaignComponent;
  let fixture: ComponentFixture<AttachTemplatesToCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachTemplatesToCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachTemplatesToCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
