import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamUserComponent } from './iam-user.component';

describe('IamUserComponent', () => {
  let component: IamUserComponent;
  let fixture: ComponentFixture<IamUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
