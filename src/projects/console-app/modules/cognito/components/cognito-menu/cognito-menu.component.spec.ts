import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoMenuComponent } from './cognito-menu.component';

describe('CognitoMenuComponent', () => {
  let component: CognitoMenuComponent;
  let fixture: ComponentFixture<CognitoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
