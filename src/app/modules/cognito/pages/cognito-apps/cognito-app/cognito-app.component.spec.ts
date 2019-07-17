import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoAppComponent } from './cognito-app.component';

describe('CognitoAppComponent', () => {
  let component: CognitoAppComponent;
  let fixture: ComponentFixture<CognitoAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitoAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
