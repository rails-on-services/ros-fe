import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommsCampaignsComponent } from './comms-campaigns.component';

describe('GroupsComponent', () => {
  let component: CommsCampaignsComponent;
  let fixture: ComponentFixture<CommsCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommsCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommsCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
