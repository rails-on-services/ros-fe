import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCognitoAppComponent } from './new-cognito-app.component';

describe('NewCognitoAppComponent', () => {
  let component: NewCognitoAppComponent;
  let fixture: ComponentFixture<NewCognitoAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCognitoAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCognitoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
