import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachEventsToCampaignComponent } from './attach-events-to-campaign.component';

describe('AttachEventsToCampaignComponent', () => {
  let component: AttachEventsToCampaignComponent;
  let fixture: ComponentFixture<AttachEventsToCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachEventsToCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachEventsToCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
