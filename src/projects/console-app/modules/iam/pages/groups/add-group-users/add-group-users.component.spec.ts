import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupUsersComponent } from './add-group-users.component';

describe('AddGroupUsersComponent', () => {
  let component: AddGroupUsersComponent;
  let fixture: ComponentFixture<AddGroupUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
