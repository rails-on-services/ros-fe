import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoHomeComponent } from './cognito-home.component';

describe('CognitoHomeComponent', () => {
  let component: CognitoHomeComponent;
  let fixture: ComponentFixture<CognitoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
