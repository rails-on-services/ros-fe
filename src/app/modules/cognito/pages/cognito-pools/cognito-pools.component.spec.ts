import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoPoolsComponent } from './cognito-pools.component';

describe('CognitoPoolsComponent', () => {
  let component: CognitoPoolsComponent;
  let fixture: ComponentFixture<CognitoPoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitoPoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoPoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
