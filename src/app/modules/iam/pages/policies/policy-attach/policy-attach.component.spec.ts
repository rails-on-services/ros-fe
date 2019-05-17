import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAttachComponent } from './policy-attach.component';

describe('PolicyAttachComponent', () => {
  let component: PolicyAttachComponent;
  let fixture: ComponentFixture<PolicyAttachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyAttachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAttachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
