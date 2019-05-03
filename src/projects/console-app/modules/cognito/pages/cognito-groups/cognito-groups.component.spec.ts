import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoGroupsComponent } from './cognito-groups.component';

describe('CognitoGroupsComponent', () => {
  let component: CognitoGroupsComponent;
  let fixture: ComponentFixture<CognitoGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitoGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
