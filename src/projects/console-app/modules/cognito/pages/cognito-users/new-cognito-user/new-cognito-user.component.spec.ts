import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCognitoUserComponent } from './new-cognito-user.component';

describe('NewCognitoUserComponent', () => {
  let component: NewCognitoUserComponent;
  let fixture: ComponentFixture<NewCognitoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCognitoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCognitoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
