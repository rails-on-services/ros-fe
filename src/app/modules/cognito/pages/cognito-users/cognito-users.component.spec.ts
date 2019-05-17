import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoUsersComponent } from './cognito-users.component';

describe('CognitoUsersComponent', () => {
  let component: CognitoUsersComponent;
  let fixture: ComponentFixture<CognitoUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitoUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
