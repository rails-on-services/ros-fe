import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCognitoPoolComponent } from './new-cognito-pool.component';

describe('NewCognitoPoolComponent', () => {
  let component: NewCognitoPoolComponent;
  let fixture: ComponentFixture<NewCognitoPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCognitoPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCognitoPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
