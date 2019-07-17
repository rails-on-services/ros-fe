import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoPoolComponent } from './cognito-pool.component';

describe('CognitoPoolComponent', () => {
  let component: CognitoPoolComponent;
  let fixture: ComponentFixture<CognitoPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitoPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
