import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoAppsComponent } from './cognito-apps.component';

describe('CognitoAppsComponent', () => {
  let component: CognitoAppsComponent;
  let fixture: ComponentFixture<CognitoAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitoAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
