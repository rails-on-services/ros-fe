import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachAppsToUserComponent } from './attach-apps-to-user.component';

describe('AttachAppsToUserComponent', () => {
  let component: AttachAppsToUserComponent;
  let fixture: ComponentFixture<AttachAppsToUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachAppsToUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachAppsToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
