import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamUsersComponent } from './iam-users.component';

describe('IamUsersComponent', () => {
  let component: IamUsersComponent;
  let fixture: ComponentFixture<IamUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
